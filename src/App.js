import React, { useEffect, useState } from "react";
import MagneticDangoLine from "./MagneticDangoLine";
import Content from "./Content";

async function fetchKiteHome() {
  const token =
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.VITE_STORYBLOK_TOKEN) ||
    process.env.REACT_APP_STORYBLOK_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_TOKEN ||
    process.env.VITE_STORYBLOK_TOKEN;

  const url =
    `https://api.storyblok.com/v2/cdn/stories/kite-home` +
    `?version=published&token=${token}&cv=${Date.now()}`;

  const res = await fetch(url);
  const json = await res.json();
  return json.story.content;
}

export default function App() {
  const [home, setHome] = useState(null);

  useEffect(() => {
    fetchKiteHome().then(setHome);
  }, []);

  return (
    <div className="App">
      {/* 背景 */}
      <MagneticDangoLine />

      {/* 本文（ここが重要） */}
      <Content storyblok={home} />
    </div>
  );
}
