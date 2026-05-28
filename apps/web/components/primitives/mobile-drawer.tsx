"use client";

import Link from "next/link";

import type { CmsLinkItem } from "@/lib/cms/schemas";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setMobileMenuOpen } from "@/lib/store/ui-slice";

type MobileDrawerTriggerProps = {
  menuLabel: string;
};

export function MobileDrawerTrigger({ menuLabel }: MobileDrawerTriggerProps) {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.mobileMenuOpen);

  return (
    <button
      aria-expanded={open}
      aria-label={menuLabel}
      className="hamburger"
      onClick={() => dispatch(setMobileMenuOpen(!open))}
      type="button"
    >
      <span />
    </button>
  );
}

type MobileDrawerProps = {
  links: CmsLinkItem[];
  pathname: string;
};

function isActive(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}

const LEGACY_PATH_TO_ANCHOR: Record<string, string> = {
  solucoes: "solucoes",
  solutions: "solucoes",
  soluciones: "solucoes",
  cases: "cases",
  casos: "cases",
  contato: "contato",
  contact: "contato",
  contacto: "contato",
  noticias: "noticias",
  news: "noticias",
};

function normalizeNavHref(href: string): string {
  if (!href.startsWith("/")) return href;
  const [pathPart, query = ""] = href.split("?");
  const querySuffix = query ? `?${query}` : "";

  const slashMatch = pathPart.match(/^\/(pt-BR|en|es)\/([^/]+)\/?$/);
  if (slashMatch) {
    const [, locale, slug] = slashMatch;
    const anchor = LEGACY_PATH_TO_ANCHOR[slug];
    if (anchor) return `/${locale}#${anchor}${querySuffix}`;
  }

  const dashMatch = pathPart.match(/^\/(pt-BR|en|es)-([^/]+)\/?$/);
  if (dashMatch) {
    const [, locale, slug] = dashMatch;
    const anchor = LEGACY_PATH_TO_ANCHOR[slug];
    if (anchor) return `/${locale}#${anchor}${querySuffix}`;
  }

  return href;
}

export function MobileDrawer({ links, pathname }: MobileDrawerProps) {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.mobileMenuOpen);

  return (
    <div aria-hidden={!open} className="mobile-drawer">
      <nav aria-label="Menu mobile" className="nav">
        {links.map((link) => {
          const href = normalizeNavHref(link.href);
          return (
            <Link
              aria-current={isActive(pathname, href) ? "page" : undefined}
              href={href}
              key={link.href}
              onClick={() => dispatch(setMobileMenuOpen(false))}
              {...(link.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
