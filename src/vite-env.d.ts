/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GISCUS_REPO?: string;
  readonly VITE_GISCUS_REPO_ID?: string;
  readonly VITE_GISCUS_CATEGORY?: string;
  readonly VITE_GISCUS_CATEGORY_ID?: string;
  readonly VITE_GISCUS_MAPPING?: string;
  readonly VITE_GISCUS_LANG?: string;
}

declare module "virtual:blog-posts" {
  export interface BlogPost {
    slug: string;
    title: string;
    date?: string;
    /** When `false` in frontmatter, Giscus is hidden for this post. Omitted or other values: show if env is configured. */
    comments: boolean;
    content: string;
  }
  export function getBlogPosts(): Promise<BlogPost[]>;
  export function getPostBySlug(slug: string): Promise<BlogPost | null>;
}
