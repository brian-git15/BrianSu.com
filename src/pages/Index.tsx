import bgGradient from "@/assets/bg-gradient.jpg";
import GlassCard from "@/components/GlassCard";
import { Mail, Github, Linkedin, ArrowUpRight, FileText, Moon, Sun } from "lucide-react";
import ExperienceMenu from "@/components/ExperienceMenu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [
  { label: "GitHub", icon: Github, href: "https://github.com/brian-git15" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/brian-su-70990a24a/" },
  { label: "Email", icon: Mail, href: "mailto:B33su@uwaterloo.ca" },
  { label: "Resume", icon: FileText, href: "https://drive.google.com/file/d/1NTMU4GsfoyuC2NVky5DLriJLqZAc-3Zn/view?usp=drive_link" },
];



const Index = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bgImage = mounted && theme === "dark" ? "/dark_mode.jpg" : bgGradient;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={bgImage}
        alt=""
        className="fixed inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-background/30" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-20">
        
        {/* Hero */}
        <GlassCard className="w-full text-center flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground flex-1">
              Brian Su
            </h1>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass-subtle inline-flex items-center justify-center px-3 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          {/* <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Embedded SWE @ Nokia, CS + Digital Hardware @ UWaterloo
          </p> */}

          {/* Social links */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-subtle inline-flex items-center justify-center px-3 py-2 rounded-md text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </GlassCard>

        <ExperienceMenu />
      </div>
    </div>
  );
};

export default Index;
