import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadFile(url: string, filename: string) {
  const loadingId = toast.loading(`Preparing ${filename}…`);
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

    const sizeKb = blob.size > 0 ? ` (${(blob.size / 1024).toFixed(0)} KB)` : "";
    toast.success("Download complete", {
      id: loadingId,
      description: `${filename}${sizeKb} saved to your downloads.`,
    });
  } catch (error) {
    toast.error("Download failed — opening in a new tab", {
      id: loadingId,
      description: filename,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
