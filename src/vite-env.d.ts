/// <reference types="vite/client" />

declare module "virtual:blog-posts" {
  export interface BlogPost {
    slug: string;
    title: string;
    date?: string;
    content: string;
  }
  export function getBlogPosts(): Promise<BlogPost[]>;
  export function getPostBySlug(slug: string): Promise<BlogPost | null>;
}
