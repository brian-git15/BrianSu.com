import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "NounwindLTO",
    description:
      "LLVM pass plugin that infers and applies nounwind at module/LTO scope, then lowers provably non-throwing invoke instructions to call + br to simplify exception handling control flow.",
    details: `Computes an interprocedural unwind lattice (Safe, Unknown, Throwing) over call graph SCCs. Marks defined functions as nounwind when analysis proves they cannot unwind. Conservatively handles unresolved/indirect calls and unknown external declarations.
Applies embedded runtime symbol policy for common Itanium/libc++ EH helper names.

`,
    github: "https://github.com/brian-git15/riscvprune",
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
    title: "Kin — Household Financial Guardian (TechTO 2026)",
    description:
      "Built the MCP server for Kin, a hackathon agent that watches a household's accounts and acts before money problems happen — exposing the full Convex backend to Cursor and routing inbound SMS through an LLM tool-planner.",
    details: `Kin is a 12-hour TechTO hackathon project: a "Ring-camera for your money" that sees across both partners' banks, the joint account, and an inbox of agreements, then proposes one-tap actions (draft an e-transfer, move funds from savings, place a TTS call) when it forecasts an overdraft.

My contribution: the MCP server (kin/mcp-server) — a stdio Model Context Protocol server that turns every public Convex function into an MCP tool so Cursor (or any MCP client) can read household data, run the agent, and process inbound SMS the same way production does.

What it does:
- Auto-registers 40+ convex_* tools (reads like getAccounts/getTransactions/getAgreements/getForecast, and writes/actions like seedDemo, runDetection, moveMoney, chatReply, runAgent, sendSms).
- Mirrors the Twilio inbound-SMS pipeline as three MCP tools: kin_route_inbound_sms (dry-run plan via Backboard LLM), kin_handle_inbound_sms (full pipeline — feed card, Backboard reply, Twilio send), and kin_execute_tool_plan (run a custom ordered list of convex_* tools).
- Uses Backboard LLM for semantic tool routing on inbound SMS, with a keyword-rules fallback (smsRouter.ts) when the LLM plan fails.
- Dispatches tool calls through a ConvexHttpClient and exposes a kin://tool-catalog MCP resource so clients can discover the live tool surface.
- Ships with offline + live smoke tests (bun run test, bun run test:live) and a Cursor mcp.json example for one-step setup.

Stack: TypeScript, Bun, Model Context Protocol SDK, Convex (HTTP client), Backboard (LLM gateway + memory), Twilio (SMS).`,
    github: "https://github.com/Kurtis24/TechTO",
  },
  {
    title: "Arbittron",
    description:
      "Live DraftKings/FanDuel arbitrage with optimal stakes, 3D opportunity viz, and a Databricks transformer — Hacklytics 2026.",
    details: `Arbittron is more than a sports betting arbitrage calculator. It's a real-time opportunity engine designed to detect and quantify pricing inequalities across sportsbooks. By taking live odds from platforms such as DraftKings and FanDuel, Arbittron instantly identifies arbitrage windows and calculates the precise stake allocation required on each side to mathematically lock in profit, regardless of the outcome.

`,
    youtube: "https://www.youtube.com/watch?v=B8H1KTTGZHE",
    github: "https://github.com/Kurtis24/Hackalytics_Repo",
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

