import GlassCard from "@/components/GlassCard";

const currExperiances = [
  {
    title: "Embedded SWE @ Nokia",
    description: "Building a TCAM tool and optimizing code in the IP networks team",
    logo: "/nokia_logo.jpg",
  },
  {
    title: "CS @ Uwaterloo",
    description: "Honours Computer Science Specialized in Digital Hardware",
    logo: "/waterloo_logo.jpg",
  },
];

const prevExperiances = [
  {
    title: "SWE @ Airfairness",
    description: "Slaying flight delays with AI",
    logo: "/airfairness_logo.jpg",
  },
];

const ExperienceSection = () => {
  return (
    <>
      <div className="w-full text-left">
        <span className="text-2xl font-bold">Currently</span>
      </div>

      <div className="grid w-full gap-3 mt-2">
        {currExperiances.map((project) => (
          <GlassCard
            key={project.title}
            className="group flex cursor-pointer items-center justify-between transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              {project.logo && (
                <div className="h-8 w-12 flex items-center justify-center rounded-md bg-muted/10 overflow-hidden">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="max-h-full max-w-full object-contain rounded-none"
                  />
                </div>
              )}
              <div>
                <h2 className="text-sm font-medium text-foreground">{project.title}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">{project.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="w-full text-left mt-4">
        <span className="text-2xl font-bold">Previously</span>
      </div>
      <div className="grid w-full gap-3 mt-2">
        {prevExperiances.map((project) => (
          <GlassCard
            key={project.title}
            className="group flex cursor-pointer items-center justify-between transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              {project.logo && (
                <div className="h-8 w-12 flex items-center justify-center rounded-md bg-muted/10 overflow-hidden">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="max-h-full max-w-full object-contain rounded-none"
                  />
                </div>
              )}
              <div>
                <h2 className="text-sm font-medium text-foreground">{project.title}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">{project.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
};

export default ExperienceSection;
