import React, { useEffect, useRef, useState } from "react";
import MagneticDangoLine from "./MagneticDangoLine";
import Content from "./Content";

// URLのパスから Storyblok の slug を作る（/kite-home → kite-home, / → kite-home）
function getSlugFromPath() {
  if (typeof window === "undefined") return "kite-home";
  const slug = window.location.pathname.replace(/^\/+/, "").trim();
  return slug || "kite-home";
}

// Storyblok から story を取得（previewなら draft / それ以外は published）
async function fetchStory(slug, isPreview = false) {
  const token =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_STORYBLOK_TOKEN) ||
    process.env.REACT_APP_STORYBLOK_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_TOKEN ||
    process.env.VITE_STORYBLOK_TOKEN;

  if (!token) throw new Error("Storyblok token is missing");

  const version = isPreview ? "draft" : "published";

  const url =
    `https://api.storyblok.com/v2/cdn/stories/${encodeURIComponent(slug)}` +
    `?version=${version}` +
    `&token=${token}` +
    `&cv=${Date.now()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Storyblok fetch failed: ${res.status}`);
  const json = await res.json();
  return json.story; // { content, ... }
}

export default function App() {
  const [homeContent, setHomeContent] = useState(null);
  const [sbError, setSbError] = useState(null);

  // Content.js が期待している refs（これが無いと落ちる）
  const sectionRefs = useRef({});

  // もし isMobile を Content 側で使ってるなら、ここで作って渡す
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const slug = getSlugFromPath();
    const isPreview =
      typeof window !== "undefined" &&
      window.location.search.includes("_storyblok");

    fetchStory(slug, isPreview)
      .then((story) => {
        setHomeContent(story.content);

        // Visual Editor の live update（bridge が入ってる場合のみ動く）
        if (isPreview && typeof window !== "undefined" && window.storyblok) {
          try {
            window.storyblok.init();

            window.storyblok.on(["input", "published", "change"], () => {
              fetchStory(slug, true)
                .then((s) => setHomeContent(s.content))
                .catch((e) => setSbError(String(e?.message || e)));
            });
          } catch (e) {
            // ここで落とさない
            console.warn("Storyblok bridge init failed:", e);
          }
        }
      })
      .catch((e) => {
        console.error(e);
        setSbError(String(e?.message || e));
      });
  }, []);

  return (
    <div className="App">
      {sbError && (
        <div style={{ padding: 12, color: "red" }}>Storyblok: {sbError}</div>
      )}

      {/* 背景（あなたのデザインの土台） */}
      <MagneticDangoLine />

      {/* 本文（既存レイアウトはContent.js側にある） */}
      <Content
        isMobile={isMobile}
        sectionRefs={sectionRefs}
        storyblok={homeContent}
      />
    </div>
  );
}
