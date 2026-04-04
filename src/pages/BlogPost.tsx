import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import type { BlogPost as BlogPostType } from "@/lib/blog";
import GlassCard from "@/components/GlassCard";
import BlogComments from "@/components/BlogComments";
import bgGradient from "@/assets/bg-gradient.jpg";
import { useTheme } from "next-themes";

/** Extract YouTube video ID and optional start time (seconds) from URL. */
function parseYouTubeUrl(href: string): { id: string; start?: number } | null {
  try {
    const u = new URL(href);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      const start = u.searchParams.get("t");
      return id ? { id, start: start ? parseInt(start, 10) : undefined } : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").filter(Boolean).pop();
      const start = u.searchParams.get("t");
      return id ? { id, start: start ? parseInt(start, 10) : undefined } : null;
    }
  } catch {
    const m = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (m) return { id: m[1] };
  }
  return null;
}

function YouTubeEmbed({ id, start }: { id: string; start?: number }) {
  const embedUrl = start
    ? `https://www.youtube.com/embed/${id}?start=${start}`
    : `https://www.youtube.com/embed/${id}`;
  return (
    <span className="my-4 block aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={embedUrl}
        title="YouTube video"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </span>
  );
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null | undefined>(undefined);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      return;
    }
    getPostBySlug(slug).then(setPost);
  }, [slug]);

  const bgImage = mounted && theme === "dark" ? "/dark_mode.jpg" : bgGradient;

  const layout = (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src={bgImage}
        alt=""
        className="fixed inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-background/30" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col px-6 py-20">
        {post === undefined && (
          <GlassCard className="p-6">
            <div className="animate-pulse text-muted-foreground">Loading…</div>
          </GlassCard>
        )}
        {post === null && (
          <GlassCard className="p-6">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm text-foreground hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <p className="text-muted-foreground">Post not found.</p>
          </GlassCard>
        )}
        {post != null && post !== undefined && (
          <GlassCard className="p-6">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <article>
              <header className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
                {post.date && (
                  <time className="text-sm text-muted-foreground" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </header>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-a:text-foreground prose-strong:text-foreground prose-code:text-foreground">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children, ...props }) => {
                      const yt = href ? parseYouTubeUrl(href) : null;
                      if (yt) return <YouTubeEmbed id={yt.id} start={yt.start} />;
                      return (
                        <a href={href} {...props} className="underline decoration-foreground/40 underline-offset-2 hover:decoration-foreground">
                          {children}
                        </a>
                      );
                    },
                    p: ({ children, ...props }) => {
                      const text = typeof children === "string" ? children.trim() : null;
                      if (text && /youtube\.com|youtu\.be/.test(text)) {
                        const yt = parseYouTubeUrl(text);
                        if (yt) return <YouTubeEmbed id={yt.id} start={yt.start} />;
                      }
                      return <p {...props}>{children}</p>;
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
              {post.comments && <BlogComments key={slug} />}
            </article>
          </GlassCard>
        )}
      </div>
    </div>
  );

  return layout;
};

export default BlogPost;
