import { useSearchParams } from "react-router-dom";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";

type Tab = "experience" | "projects" | "about" | "resume";

const isValidTab = (value: string | null): value is Tab =>
  value === "experience" || value === "projects" || value === "about" || value === "resume";

const ExperienceMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: Tab = isValidTab(tabParam) ? tabParam : "experience";

  const selectTab = (id: Tab) => {
    if (id === "experience") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ tab: id }, { replace: true });
    }
  };

  const TabButton = ({ id, label }: { id: Tab; label: string }) => (
    <button
      onClick={() => selectTab(id)}
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
        {/* <TabButton id="resume" label="Resume"/> */}
      </div>

      <div className="mt-3">
        {tab === "experience" && <ExperienceSection />}
        {tab === "projects" && <ProjectsSection />}
        {tab === "about" && <AboutSection />}
        {/* {tab === "resume" && <ResumeSection/>} */}
      </div>
    </div>
  );
};

export default ExperienceMenu;
