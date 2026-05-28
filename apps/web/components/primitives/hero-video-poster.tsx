"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoPosterProps = {
  posterUrl: string;
  alt?: string;
  priority?: boolean;
};

export function HeroVideoPoster({ posterUrl, alt = "", priority = false }: HeroVideoPosterProps) {
  const posterRef = useRef<HTMLImageElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const video = posterRef.current?.parentElement?.querySelector("video");
    if (!video) return;

    const hide = () => setHidden(true);
    video.addEventListener("playing", hide, { once: true });
    video.play().catch(() => {
      /* autoplay blocked - keep poster visible */
    });

    if (!video.paused) hide();

    return () => {
      video.removeEventListener("playing", hide);
    };
  }, []);

  return (
    <img
      alt={alt}
      aria-hidden="true"
      className={`hero__media-poster${hidden ? " is-hidden" : ""}`}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      ref={posterRef}
      src={posterUrl}
    />
  );
}
