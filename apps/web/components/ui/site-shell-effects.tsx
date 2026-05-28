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
