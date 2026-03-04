import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Youtube } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { getBlogPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

const YOUTUBE_URL = "https://www.youtube.com/channel/UCN19tbojkpXjS1GtuFRDV-g"; // replace with your channel
const YOUTUBE_AVATAR = "/ytprofile.jpg"; // add your image to public/

const AboutSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-bold text-foreground">About</h3>

      {/* YouTube profile — circular avatar with link */}
      <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full ring-2 ring-foreground/20 transition hover:ring-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/50"
            aria-label="YouTube channel"
          >
            <img
              src={YOUTUBE_AVATAR}
              alt="YouTube profile"
              className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
              width={112}
              height={112}
            />
          </a>
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Youtube className="h-3.5 w-3.5" />
            YouTube
          </span>
        </div>
        <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            Hi, I'm Brian — embedded software engineer and second-year computer science student. I'm at Nokia's Ottawa office this term; if you're in the area, say hi!
          </p>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            Outside of work I'm a singer and songwriter (still working on it), ex-varsity athlete, and current running enthusiast.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-foreground/10 pt-5">
        <p className="text-sm font-medium text-foreground leading-relaxed">
          I was on the{" "}
          <a
            href="https://www.youtube.com/@waterboysacappella"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-foreground/40 underline-offset-2 hover:decoration-foreground"
          >
            Waterboys A-Cappella group
          </a>{" "}
          (Fall 2025). I'm currently writing a song — stay tuned for that.
        </p>
        <p className="text-sm font-medium text-foreground leading-relaxed">
          I'll be writing more about my journey here.
        </p>

        {posts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-foreground/10">
            <p className="text-sm font-semibold text-foreground mb-2">Blogs</p>
            <ul className="space-y-1.5">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm font-medium text-foreground underline decoration-foreground/40 underline-offset-2 hover:decoration-foreground"
                  >
                    {post.title}
                  </Link>
                  {post.date && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default AboutSection;
