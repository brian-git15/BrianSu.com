import type { Plugin } from "vite";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

const BLOG_DIR = path.resolve(process.cwd(), "src/content/blog");
const VIRTUAL_ID = "virtual:blog-posts";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

function loadBlogPosts(): Array<{
  slug: string;
  title: string;
  date?: string;
  comments: boolean;
  content: string;
}> {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".txt"));
  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.(md|txt)$/, "");
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: data.date as string | undefined,
      comments: data.comments !== false,
      content,
    };
  });
  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function blogPlugin(): Plugin {
  return {
    name: "blog-posts",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const posts = loadBlogPosts();
      const code = `
export const __blogPosts = ${JSON.stringify(posts)};

export function getBlogPosts() {
  return Promise.resolve(__blogPosts);
}

export function getPostBySlug(slug) {
  const post = __blogPosts.find((p) => p.slug === slug) ?? null;
  return Promise.resolve(post);
}
`;
      return { code, map: null };
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(BLOG_DIR) && (file.endsWith(".md") || file.endsWith(".txt"))) {
        server.ws.send({ type: "full-reload", path: "*" });
      }
    },
  };
}
