import GlassCard from "@/components/GlassCard";

const AboutSection = () => {
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-bold text-foreground">About</h3>
      <div className="mt-4 space-y-3">
        <p className="text-sm font-medium text-foreground leading-relaxed">
          Hi!!! I'm Brian, an embedded software engineer and computer science student in my second year. I'm at Nokia's Ottawa Office this term, so if you're in that area feel free to hit me up!
        </p>
        <p className="text-sm font-medium text-foreground leading-relaxed">
          In case you were here to get to know me, outside of my career I'm a singer and songwriter (although the songwriter part is still in progress), and ex-varsity and current running enjoyer.
        </p>
        <p className="text-sm font-medium text-foreground leading-relaxed">
          I was on the{" "}
          <a
            href="https://www.youtube.com/@waterboysacappella"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline font-bold"
          >
            Waterboys A-Cappella group
          </a>
          {" "}(Fall 2025)!, I'm currently writing a song, so stay tooned for that.
        </p>
        <p className="text-sm font-medium text-foreground leading-relaxed">
            I'll be writting more about my journey here.
        </p>
      </div>
    </GlassCard>
  );
};

export default AboutSection;
