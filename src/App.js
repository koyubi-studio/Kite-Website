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

      {/* デバッグ用：Storyblokの中身を丸ごと表示 */}
      <div style={{ padding: 12, whiteSpace: "pre-wrap", fontSize: 12 }}>
        {home ? JSON.stringify(home, null, 2) : "loading..."}
      </div>

      {/* 既存コンポーネント */}
      <MagneticDangoLine />
    </div>
  );
}
