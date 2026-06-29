import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Bot, MessageSquarePlus, Send, Sparkles, Trash2, X, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Thread = { id: string; title: string; updated_at: string };
type Msg = { id: string; role: "user" | "assistant"; content: string };

const VISITOR_KEY = "pawlos_ai_visitor_id";
const getVisitorId = () => {
  let v = localStorage.getItem(VISITOR_KEY);
  if (!v) {
    v = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, v);
  }
  return v;
};

const AskPawlosAI = () => {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [pendingAssistant, setPendingAssistant] = useState("");
  const visitorId = useRef(getVisitorId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load threads on open
  useEffect(() => {
    if (!open) return;
    (async () => {
      const { data } = await supabase
        .from("chat_threads")
        .select("id,title,updated_at")
        .eq("visitor_id", visitorId.current)
        .order("updated_at", { ascending: false });
      setThreads(data ?? []);
      if (data && data.length && !activeId) setActiveId(data[0].id);
    })();
  }, [open]);

  // Load messages for active thread
  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("id,role,content")
        .eq("thread_id", activeId)
        .order("created_at", { ascending: true });
      setMessages(
        (data ?? []).filter((m) => m.role !== "system").map((m) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      );
    })();
  }, [activeId]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pendingAssistant]);

  // Focus input
  useEffect(() => {
    if (open && !streaming) inputRef.current?.focus();
  }, [open, activeId, streaming]);

  const createThread = async (firstUserMsg?: string): Promise<string | null> => {
    const title = firstUserMsg ? firstUserMsg.slice(0, 50) : "New chat";
    const { data, error } = await supabase
      .from("chat_threads")
      .insert({ visitor_id: visitorId.current, title })
      .select("id,title,updated_at")
      .single();
    if (error || !data) {
      toast.error("Could not start chat");
      return null;
    }
    setThreads((t) => [data, ...t]);
    setActiveId(data.id);
    setMessages([]);
    return data.id;
  };

  const deleteThread = async (id: string) => {
    await supabase.from("chat_threads").delete().eq("id", id);
    setThreads((t) => t.filter((x) => x.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    let threadId = activeId;
    if (!threadId) {
      threadId = await createThread(text);
      if (!threadId) return;
    } else {
      // Update title if first message
      if (messages.length === 0) {
        await supabase.from("chat_threads").update({ title: text.slice(0, 50) }).eq("id", threadId);
        setThreads((t) =>
          t.map((x) => (x.id === threadId ? { ...x, title: text.slice(0, 50) } : x))
        );
      }
    }

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);

    // Persist user message
    await supabase.from("chat_messages").insert({
      thread_id: threadId,
      role: "user",
      content: text,
    });

    setStreaming(true);
    setPendingAssistant("");

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-with-pawlos`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        if (res.status === 429) toast.error("Rate limit — try again in a moment.");
        else if (res.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Chat failed");
        setStreaming(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              assistant += delta;
              setPendingAssistant(assistant);
            }
          } catch {
            /* skip */
          }
        }
      }

      const assistantMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistant || "(no response)",
      };
      setMessages((m) => [...m, assistantMsg]);
      setPendingAssistant("");

      await supabase.from("chat_messages").insert({
        thread_id: threadId,
        role: "assistant",
        content: assistantMsg.content,
      });
      await supabase
        .from("chat_threads")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", threadId);
    } catch (e) {
      toast.error("Network error");
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask Pawlos AI"
        className="fixed bottom-24 right-6 z-40 group flex items-center gap-2 px-4 py-3 rounded-full
                   glass-card border border-primary/40 hover:border-primary
                   shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300
                   backdrop-blur-xl bg-background/60"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          <Bot className="relative h-4 w-4 text-primary" />
        </span>
        <span className="text-sm font-semibold text-foreground hidden sm:inline">
          Ask Pawlos AI
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-2xl border-primary/30"
        >
          <SheetHeader className="px-4 py-3 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
            <SheetTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              Pawlos AI
            </SheetTitle>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => createThread()}
                title="New chat"
              >
                <MessageSquarePlus className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Threads */}
          {threads.length > 0 && (
            <div className="border-b border-border/50 px-2 py-2 max-h-32 overflow-y-auto">
              <div className="flex flex-wrap gap-1">
                {threads.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "group flex items-center gap-1 rounded-full border text-xs pl-2 pr-1 py-1 cursor-pointer transition-colors",
                      activeId === t.id
                        ? "bg-primary/15 border-primary/60 text-foreground"
                        : "bg-card/30 border-border/50 hover:bg-card/60 text-muted-foreground"
                    )}
                  >
                    <span
                      onClick={() => setActiveId(t.id)}
                      className="max-w-[140px] truncate"
                    >
                      {t.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteThread(t.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/20 transition"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && !pendingAssistant && (
                <div className="text-center py-10 space-y-3">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 border border-primary/40">
                    <Bot className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold">Hi, I'm Pawlos 👋</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Ask me about my skills, projects, experience, or how we could work together.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {[
                      "What's your tech stack?",
                      "Tell me about Garage123",
                      "Are you available for work?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => setInput(q)}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}

              {pendingAssistant && (
                <MessageBubble role="assistant" content={pendingAssistant} streaming />
              )}
              {streaming && !pendingAssistant && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bot className="h-4 w-4 text-primary" />
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Composer */}
          <div className="border-t border-border/50 p-3 flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask Pawlos anything..."
              disabled={streaming}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={streaming || !input.trim()}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const MessageBubble = ({
  role,
  content,
  streaming,
}: {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}) => {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="h-7 w-7 shrink-0 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
          <Bot className="h-3.5 w-3.5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card/60 border border-border/50 text-foreground rounded-bl-sm"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-2">
            <ReactMarkdown>{content}</ReactMarkdown>
            {streaming && <span className="inline-block w-1.5 h-3 bg-primary animate-pulse ml-0.5" />}
          </div>
        )}
      </div>
      {isUser && (
        <div className="h-7 w-7 shrink-0 rounded-full bg-muted flex items-center justify-center">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
};

export default AskPawlosAI;
