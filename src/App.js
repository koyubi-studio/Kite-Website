import React, { useEffect, useState } from "react";
import MagneticDangoLine from "./MagneticDangoLine";

// Storyblok から Home データを取得
async function fetchKiteHome() {
  const token =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_STORYBLOK_TOKEN) ||
    process.env.REACT_APP_STORYBLOK_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_TOKEN ||
    process.env.VITE_STORYBLOK_TOKEN;

  if (!token) throw new Error("Storyblok token is missing");

  const url =
    `https://api.storyblok.com/v2/cdn/stories/kite-home` +
    `?version=published` +
    `&token=${token}` +
    `&cv=${Date.now()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Storyblok fetch failed: ${res.status}`);
  const json = await res.json();
  return json.story.content;
}

// --- Richtext を最小でHTMLにする関数 ---
function renderRichText(richtext) {
  if (!richtext || !richtext.content) return null;

  return richtext.content.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i}>
          {block.content?.map((t, j) => t.text).join("")}
        </p>
      );
    }
    return null;
  });
}

export default function App() {
  const [home, setHome] = useState(null);
  const [sbError, setSbError] = useState(null);

  useEffect(() => {
    fetchKiteHome()
      .then(setHome)
      .catch((e) => {
        console.error(e);
        setSbError(String(e?.message || e));
      });
  }, []);

  return (
    <div className="App">
      {/* エラー表示 */}
      {sbError && (
        <div style={{ color: "red", padding: 12 }}>
          Storyblok error: {sbError}
        </div>
      )}

      {/* Storyblok blocks を描画 */}
      {home?.body?.map((block) => {
        if (block.component === "rich_text_section") {
          return (
            <section key={block._uid} style={{ padding: "24px 0" }}>
              {renderRichText(block.text)}
            </section>
          );
        }

        if (block.component === "image_section") {
          return (
            <section key={block._uid} style={{ padding: "24px 0" }}>
              <img
                src={block.image?.filename}
                alt={block.caption || ""}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </section>
          );
        }

        return null;
      })}

      {/* 既存コンポーネント */}
      <MagneticDangoLine />
    </div>
  );
}
