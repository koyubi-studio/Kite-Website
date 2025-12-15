import React, { useEffect, useState } from "react";
import MagneticDangoLine from "./MagneticDangoLine";

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
      {sbError && <div>Storyblok error: {sbError}</div>}

      <div style={{ padding: 12 }}>
        {home?.body?.[0]?.headline || "loading..."}
      </div>

      <MagneticDangoLine />
    </div>
  );
}
