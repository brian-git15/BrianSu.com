import bgGradient from "@/assets/bg-gradient.jpg";
import GlassCard from "@/components/GlassCard";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const links = [
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "Email", icon: Mail, href: "mailto:hello@example.com" },
];

const projects = [
  { title: "Project Alpha", description: "A design system built for clarity." },
  { title: "Project Beta", description: "Mobile-first commerce experience." },
  { title: "Project Gamma", description: "Real-time data visualization tool." },
];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={bgGradient}
        alt=""
        className="fixed inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-background/30" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 py-20">
        
        {/* Hero */}
        <GlassCard className="w-full text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
            JD
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Jane Doe
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Designer & developer crafting minimal, human‑centered digital experiences.
          </p>

          {/* Social links */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subtle inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </GlassCard>

        {/* Projects */}
        <div className="grid w-full gap-3">
          {projects.map((project) => (
            <GlassCard
              key={project.title}
              className="group flex cursor-pointer items-center justify-between transition-transform hover:-translate-y-0.5"
            >
              <div>
                <h2 className="text-sm font-medium text-foreground">
                  {project.title}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
