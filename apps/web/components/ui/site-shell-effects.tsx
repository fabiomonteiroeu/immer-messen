"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAppSelector } from "@/lib/store/hooks";
import {
  getInstitutionalPageKeyFromSlug,
  type InstitutionalPageKey,
} from "@/lib/cms/page-routes";
import { isSupportedLocale, type SupportedLocale } from "@/lib/i18n/config";

type SiteShellEffectsProps = {
  homeHref: string;
};

const TRANSPARENT_PAGE_KEYS: InstitutionalPageKey[] = ["home", "technology"];

function isTransparentHeaderPath(pathname: string, homeHref: string): boolean {
  if (pathname === homeHref || pathname === `${homeHref}/`) return true;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length !== 2) return false;
  const [localeSeg, slug] = segments;
  if (!isSupportedLocale(localeSeg)) return false;
  const pageKey = getInstitutionalPageKeyFromSlug(localeSeg as SupportedLocale, slug);
  return pageKey ? TRANSPARENT_PAGE_KEYS.includes(pageKey) : false;
}

export function SiteShellEffects({ homeHref }: SiteShellEffectsProps) {
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const pathname = usePathname();
  const isTransparent = isTransparentHeaderPath(pathname, homeHref);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    // esconde a barra ao descer, revela ao subir — só depois de passar do hero
    const HIDE_AFTER = 140;
    const DELTA = 6;
    let lastY = window.scrollY;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const y = Math.max(window.scrollY, 0);
      header.classList.toggle("scrolled", y > 30);

      const movedDown = y > lastY + DELTA;
      const movedUp = y < lastY - DELTA;

      if (movedDown && y > HIDE_AFTER) {
        header.classList.add("header--hidden");
      } else if (movedUp || y <= HIDE_AFTER) {
        header.classList.remove("header--hidden");
      }

      if (movedDown || movedUp) lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    header.classList.toggle("header--transparent", isTransparent);
  }, [isTransparent]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [mobileMenuOpen]);

  return null;
}
