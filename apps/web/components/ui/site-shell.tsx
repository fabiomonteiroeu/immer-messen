"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import type { Dictionary } from "@/lib/i18n/config";
import type {
  CmsCookieBanner,
  CmsFooter,
  CmsGlobalSetting,
  CmsLinkItem,
} from "@/lib/cms/schemas";
import { resolveMediaUrl } from "@/lib/cms/media";

import { LanguageSwitcher } from "@/components/primitives/language-switcher";
import { MobileDrawer, MobileDrawerTrigger } from "@/components/primitives/mobile-drawer";
import { LgpdBanner } from "@/components/ui/lgpd-banner";
import { SiteShellEffects } from "@/components/ui/site-shell-effects";

type SiteShellProps = {
  children: React.ReactNode;
  dictionary: Dictionary;
  global: CmsGlobalSetting | null;
  footer: CmsFooter | null;
  cookieBanner: CmsCookieBanner | null;
};

const FALLBACK_LOGO = "/assets/img/logo-immer.png";
const FALLBACK_CONTACT_EMAIL = "contato@immermessen.com";
const FALLBACK_CONTACT_PHONE = "+55 41 00000-0000";

function isActive(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}

function linkTargetProps(link: CmsLinkItem) {
  return link.openInNewTab
    ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};
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

function NavLinks({
  links,
  pathname,
}: {
  links: CmsLinkItem[];
  pathname: string;
}) {
  return (
    <>
      {links.map((link) => {
        const href = normalizeNavHref(link.href);
        return (
          <Link
            aria-current={isActive(pathname, href) ? "page" : undefined}
            href={href}
            key={link.href}
            {...linkTargetProps(link)}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export function SiteShell({
  children,
  dictionary,
  global,
  footer,
  cookieBanner,
}: SiteShellProps) {
  const pathname = usePathname();
  const localeSegment = pathname.split("/").filter(Boolean)[0] ?? "pt-BR";
  const homeHref = `/${localeSegment}`;
  const navLinks = footer?.menuColumns?.[0]?.links ?? [];
  const headerLogoUrl = resolveMediaUrl(global?.primaryLogo?.url) ?? FALLBACK_LOGO;
  const headerLogoAlt = global?.primaryLogo?.alternativeText ?? global?.siteName ?? "Immer Messen";

  const footerLogoUrl = resolveMediaUrl(footer?.logo?.url) ?? headerLogoUrl;
  const footerLogoAlt = footer?.logo?.alternativeText ?? headerLogoAlt;
  const tagline = footer?.tagline ?? dictionary.defaultFooterTagline;
  const copyright = footer?.copyrightText ?? dictionary.defaultFooterRights;
  const privacyLink = footer?.privacyLink;
  const privacyHref = privacyLink?.href ?? `${homeHref}/lgpd`;
  const privacyLabel = privacyLink?.label ?? dictionary.defaultPrivacyLabel;

  const contactEmail =
    footer?.contactDetails?.email ?? global?.contactDetails?.email ?? FALLBACK_CONTACT_EMAIL;
  const contactPhone =
    footer?.contactDetails?.phone ?? global?.contactDetails?.phone ?? FALLBACK_CONTACT_PHONE;
  const contactPhoneHref = `tel:${contactPhone.replace(/\D+/g, "")}`;

  const lgpdText = cookieBanner?.text ?? dictionary.defaultLgpdText;
  const lgpdAccept = cookieBanner?.acceptLabel ?? dictionary.defaultLgpdAccept;
  const lgpdMore = cookieBanner?.learnMoreLink?.label ?? dictionary.defaultLgpdMore;
  const lgpdMoreHref = cookieBanner?.learnMoreLink?.href ?? privacyHref;

  return (
    <>
      <SiteShellEffects homeHref={homeHref} />

      <a className="skip-link" href="#main">
        {dictionary.skipLink}
      </a>

      <header className="site-header" id="header">
        <div className="site-header__inner">
          <Link aria-label={headerLogoAlt} className="logo" href={homeHref}>
            <img alt={headerLogoAlt} src={headerLogoUrl} />
          </Link>
          <nav aria-label={dictionary.ariaNavigation} className="nav">
            <NavLinks links={navLinks} pathname={pathname} />
          </nav>
          <div className="header-right">
            <Suspense fallback={null}>
              <LanguageSwitcher langLabel={dictionary.langLabel} />
            </Suspense>
            <MobileDrawerTrigger menuLabel={dictionary.menuLabel} />
          </div>
        </div>
      </header>

      <MobileDrawer links={navLinks} pathname={pathname} />

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-tag">
              <div className="logo">
                <img alt={footerLogoAlt} src={footerLogoUrl} />
              </div>
              <p className="tagline">{tagline}</p>
            </div>
            <div className="footer-col">
              <h4>{dictionary.footerMenuTitle}</h4>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={normalizeNavHref(link.href)} {...linkTargetProps(link)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col footer-contact">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href={contactPhoneHref}>{contactPhone}</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{copyright}</span>
            <Link
              href={privacyHref}
              {...(privacyLink ? linkTargetProps(privacyLink) : {})}
            >
              {privacyLabel}
            </Link>
          </div>
        </div>
      </footer>

      <LgpdBanner
        accept={lgpdAccept}
        ariaLabel={dictionary.ariaCookieDialog}
        more={lgpdMore}
        privacyHref={lgpdMoreHref}
        text={lgpdText}
      />
    </>
  );
}
