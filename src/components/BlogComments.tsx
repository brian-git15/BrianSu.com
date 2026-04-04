import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const GISCUS_ORIGIN = "https://giscus.app";

function trim(s: string | undefined): string | undefined {
  if (s == null) return undefined;
  const t = s.trim();
  return t.length ? t : undefined;
}

function getGiscusEnv() {
  const repo = trim(import.meta.env.VITE_GISCUS_REPO as string | undefined);
  const repoId = trim(import.meta.env.VITE_GISCUS_REPO_ID as string | undefined);
  const category = trim(import.meta.env.VITE_GISCUS_CATEGORY as string | undefined);
  const categoryId = trim(import.meta.env.VITE_GISCUS_CATEGORY_ID as string | undefined);
  const mapping = trim(import.meta.env.VITE_GISCUS_MAPPING as string | undefined) ?? "pathname";
  const lang = trim(import.meta.env.VITE_GISCUS_LANG as string | undefined) ?? "en";
  return { repo, repoId, category, categoryId, mapping, lang };
}

function isConfigComplete(
  e: ReturnType<typeof getGiscusEnv>
): e is {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  lang: string;
} {
  return Boolean(e.repo && e.repoId && e.category && e.categoryId);
}

function giscusTheme(resolved: string | undefined): "light" | "dark" {
  return resolved === "dark" ? "dark" : "light";
}

function sendGiscusTheme(theme: "light" | "dark") {
  const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
  iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, GISCUS_ORIGIN);
}

/**
 * Giscus requires a preceding empty `div.giscus` in the DOM. If only a dynamic script exists,
 * `document.currentScript` is null and the embed fails (see giscus client.js).
 */
export default function BlogComments() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);
  const [mounted, setMounted] = useState(false);

  themeRef.current = resolvedTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const env = getGiscusEnv();
  const configured = isConfigComplete(env);
  const ready = mounted && configured;

  useEffect(() => {
    if (!ready || !wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    wrapper.replaceChildren();

    const mount = document.createElement("div");
    mount.className = "giscus";

    const script = document.createElement("script");
    script.src = `${GISCUS_ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", env.repo);
    script.setAttribute("data-repo-id", env.repoId);
    script.setAttribute("data-category", env.category);
    script.setAttribute("data-category-id", env.categoryId);
    script.setAttribute("data-mapping", env.mapping);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", giscusTheme(themeRef.current));
    script.setAttribute("data-lang", env.lang);

    wrapper.appendChild(mount);
    wrapper.appendChild(script);

    return () => {
      wrapper.replaceChildren();
    };
  }, [ready, env.repo, env.repoId, env.category, env.categoryId, env.mapping, env.lang]);

  useEffect(() => {
    if (!mounted || !configured) return;
    const theme = giscusTheme(resolvedTheme);
    const delays = [0, 50, 150, 400, 1000];
    const ids = delays.map((ms) => window.setTimeout(() => sendGiscusTheme(theme), ms));
    return () => ids.forEach(clearTimeout);
  }, [resolvedTheme, mounted, configured]);

  return (
    <section
      className="mt-10 border-t border-border/60 pt-8"
      aria-labelledby="blog-comments-heading"
    >
      <h2 id="blog-comments-heading" className="mb-4 text-lg font-semibold text-foreground">
        Comments
      </h2>
      {configured ? (
        <div ref={wrapperRef} className="min-h-[120px]" aria-label="Discussion" />
      ) : (
        <p className="text-sm text-muted-foreground">Comments are not enabled on this deployment.</p>
      )}
    </section>
  );
}
