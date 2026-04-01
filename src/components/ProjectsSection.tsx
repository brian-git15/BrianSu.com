import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Arbittron",
    description:
      "Live DraftKings/FanDuel arbitrage with optimal stakes, 3D opportunity viz, and a Databricks transformer — Hacklytics 2026.",
    details: `Arbittron is a real-time sports betting arbitrage engine built in 36 hours. It ingests live odds from DraftKings and FanDuel, spots pricing gaps across markets, and computes stake splits that lock in profit regardless of outcome. Opportunities show up in an interactive 3D scatter plot (filter by return, implied-probability spread, liquidity), backed by a sequence-based transformer trained and served on Databricks. Stack: React, Three.js, FastAPI, PyTorch, Apache Spark.`,
    youtube: "https://www.youtube.com/watch?v=B8H1KTTGZHE",
    github: "https://github.com/Kurtis24/Hackalytics_Repo",
  },
  {
    title: "SLiM",
    description: "A real time Small Language Model generation factory that learns from your LLM and creates lightweight models to fit your hyperspecialized needs without draining credits",
    details: `SLiM (Small Language Model) is a pipeline that ingests fine-tuning data from user interactions, trains compact models, and serves them with very low latency. It includes model distillation, quantization, and an autopruning step to keep size and compute minimal.


Mock notes: currently supports basic text generation and retrieval-augmented generation demos.`,
    youtube: "https://www.youtube.com/watch?v=Rhxzl5RAJs4",
    github: "https://github.com/AyanSanaullah/SLiM",
  },
  {
    title: "NanoWorks",
    description: "A DNA Origami Generation tool that can generate any shape using DNA, inspired by Mark Rober",
    details: `NanoWorks is a toolchain that converts a description into an arbitrary 2D and 3D shape, finally turning it into scaffold/routing designs for DNA origami. It simulates strand 
interactions and outputs staple lists and visualization files.

Mock notes: includes a sample gallery and an automated validator for foldability.`,
    youtube: "https://www.youtube.com/watch?v=N8X2oWvuaNU",
    github: "https://github.com/Kurtis24/Terrahacks-Hackathon/tree/main?tab=readme-ov-file",
  },
  {
    title: "FlowScan",
    description: "A CFD generation tool taking advantage of AI to autofill meshs",
    details: `In progress`,
  },
];

const ProjectsSection = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggleProject = (title: string) => {
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="grid w-full gap-3">
      {projects.map((p) => (
        <Collapsible key={p.title} open={open[p.title] || false} onOpenChange={() => toggleProject(p.title)}>
          <CollapsibleTrigger asChild>
            <GlassCard className="p-4 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
                  {!open[p.title] && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                  )}
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${open[p.title] ? "rotate-180" : ""}`} />
              </div>
            </GlassCard>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <GlassCard className="p-4 bg-muted/5">
              {p.youtube && (() => {
                const getYouTubeId = (url: string) => {
                  try {
                    const u = new URL(url);
                    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
                    if (u.searchParams.has('v')) return u.searchParams.get('v');
                  } catch (e) {
                    // fallback regex
                    const m = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
                    return m ? m[1] : null;
                  }
                  return null;
                };

                const id = getYouTubeId(p.youtube as string);
                if (id) {
                  const embed = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
                  return (
                    <div className="w-full">
                      <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <iframe
                          src={embed}
                          title={`${p.title} demo`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full absolute inset-0"
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              <p className="text-sm text-foreground leading-relaxed mt-3">{p.details}</p>
              <div className="mt-3 text-xs text-muted-foreground">
                <strong>Summary:</strong> {p.description}
              </div>
              <div className="mt-3 flex items-center gap-4">
                {p.youtube && (
                  <a
                    href={p.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Watch demo
                  </a>
                )}

                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground hover:underline"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                )}
              </div>
            </GlassCard>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default ProjectsSection;

