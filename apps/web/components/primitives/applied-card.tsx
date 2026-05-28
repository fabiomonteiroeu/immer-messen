"use client";

import { useState } from "react";

type AppliedCardMediaProps = {
  alt: string;
  src: string;
  summary: string;
};

export function AppliedCardMedia({ alt, src, summary }: AppliedCardMediaProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`applied-card__media${open ? " is-open" : ""}`}
      onClick={() => {
        if (window.matchMedia("(hover: hover)").matches) return;
        setOpen((prev) => !prev);
      }}
      role="button"
      tabIndex={0}
    >
      <img alt={alt} loading="lazy" src={src} />
      <div className="applied-card__overlay">
        <p>{summary}</p>
      </div>
    </div>
  );
}
