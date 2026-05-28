"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAppSelector } from "@/lib/store/hooks";

type SiteShellEffectsProps = {
  homeHref: string;
};

export function SiteShellEffects({ homeHref }: SiteShellEffectsProps) {
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const pathname = usePathname();
  const isHome = pathname === homeHref || pathname === `${homeHref}/`;

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    header.classList.toggle("header--transparent", isHome);
  }, [isHome]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [mobileMenuOpen]);

  return null;
}
