"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { localizePath } from "@/lib/cms/page-routes";
import {
  defaultLocale,
  isSupportedLocale,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n/config";

const localeShort: Record<SupportedLocale, string> = {
  "pt-BR": "PT",
  en: "EN",
  es: "ES",
};

const localeFlag: Record<SupportedLocale, string> = {
  "pt-BR": "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

type LanguageSwitcherProps = {
  langLabel: string;
};

export function LanguageSwitcher({ langLabel }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const activeLocale: SupportedLocale = isSupportedLocale(firstSegment)
    ? firstSegment
    : defaultLocale;
  const search = searchParams.toString();

  return (
    <DropdownMenu.Root>
      <div className="lang">
        <DropdownMenu.Trigger aria-label={langLabel} className="lang-btn">
          <svg
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          </svg>
          <span className="lang-current">{localeShort[activeLocale]}</span>
          <svg
            aria-hidden="true"
            className="chev"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="end" className="lang-menu" sideOffset={10}>
            {supportedLocales.map((locale) => (
              <DropdownMenu.Item asChild key={locale}>
                <Link
                  aria-current={locale === activeLocale ? "true" : undefined}
                  href={`${localizePath(pathname, locale)}${search ? `?${search}` : ""}`}
                >
                  <span className="flag">{localeFlag[locale]}</span>
                  <span className="code">{localeShort[locale]}</span>
                </Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  );
}
