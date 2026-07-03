import CodeWindow from "./CodeWindow";
import AchievementWall from "./AchievementWall";

const CodeAndAchievements = () => (
  <section id="code-achievements" className="py-24 px-4 relative">
    <div className="container mx-auto max-w-6xl space-y-20">
      <div>
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              developer.ts
            </span>
          </h2>
          <p className="text-muted-foreground">A snapshot of who I am — in code.</p>
        </div>
        <CodeWindow />
      </div>
      <div>
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Achievement Wall
            </span>
          </h2>
          <p className="text-muted-foreground">Hover any trophy to reveal the story.</p>
        </div>
        <AchievementWall />
      </div>
    </div>
  </section>
);

export default CodeAndAchievements;
