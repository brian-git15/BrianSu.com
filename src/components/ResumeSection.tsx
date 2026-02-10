import GlassCard from "@/components/GlassCard";

const ResumeSection = () => {
  return (
    <div className="w-full">
      <GlassCard className="p-4">
        <h3 className="text-sm font-medium text-foreground">Resume</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Embedded PDF preview. You can scroll, zoom, or download.
        </p>

        <div className="mt-3 w-full">
          <div className="relative w-full h-[600px] rounded-md overflow-hidden border border-muted/20">
            <iframe
              src="https://drive.google.com/file/d/1NTMU4GsfoyuC2NVky5DLriJLqZAc-3Zn/preview"
              className="w-full h-full"
              title="Resume PDF"
              allow="autoplay"
            />
          </div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          If the preview doesn’t load,{" "}
          <a
            href="https://drive.google.com/file/d/1NTMU4GsfoyuC2NVky5DLriJLqZAc-3Zn/view"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            open in new tab
          </a>
          .
        </div>
      </GlassCard>
    </div>
  );
};

export default ResumeSection;
