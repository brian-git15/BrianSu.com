import { useState } from "react";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";

const ExperienceMenu = () => {
  const [tab, setTab] = useState<"experience" | "projects" | "about" | "resume">("experience");

  const TabButton = ({ id, label }: { id: "experience" | "projects" | "about" | "resume"; label: string }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${tab === id ? "bg-foreground text-background" : "bg-muted/10 text-foreground"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-start gap-3">
        <TabButton id="experience" label="Experience" />
        <TabButton id="projects" label="Projects" />
        <TabButton id="about" label="About" />
        <TabButton id="resume" label="Resume"/>
      </div>

      <div className="mt-3">
        {tab === "experience" && <ExperienceSection />}
        {tab === "projects" && <ProjectsSection />}
        {tab === "about" && <AboutSection />}
        {tab === "resume" && <ResumeSection/>}
      </div>
    </div>
  );
};

export default ExperienceMenu;
