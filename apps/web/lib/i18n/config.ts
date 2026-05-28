export const supportedLocales = ["pt-BR", "en", "es"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "pt-BR";

export type Dictionary = {
  skipLink: string;
  menuLabel: string;
  langLabel: string;
  footerMenuTitle: string;
  ariaNavigation: string;
  ariaCookieDialog: string;
  defaultFooterTagline: string;
  defaultFooterRights: string;
  defaultPrivacyLabel: string;
  defaultLgpdText: string;
  defaultLgpdAccept: string;
  defaultLgpdMore: string;
};

const dictionaries: Record<SupportedLocale, Dictionary> = {
  "pt-BR": {
    skipLink: "Pular para conteúdo",
    menuLabel: "Abrir menu",
    langLabel: "Selecionar idioma",
    footerMenuTitle: "MENU",
    ariaNavigation: "Navegação principal",
    ariaCookieDialog: "Aviso de cookies",
    defaultFooterTagline: "Sensoriando o mundo pela fibra óptica",
    defaultFooterRights: "© 2026 Immer Messen. Todos os direitos reservados.",
    defaultPrivacyLabel: "Política de Privacidade e LGPD",
    defaultLgpdText:
      "Utilizamos cookies para melhorar sua experiência no site. Ao continuar navegando, você concorda com nossa Política de Privacidade.",
    defaultLgpdAccept: "Aceitar",
    defaultLgpdMore: "Saiba mais",
  },
  en: {
    skipLink: "Skip to content",
    menuLabel: "Open menu",
    langLabel: "Select language",
    footerMenuTitle: "MENU",
    ariaNavigation: "Main navigation",
    ariaCookieDialog: "Cookie notice",
    defaultFooterTagline: "Sensing the world through optical fiber",
    defaultFooterRights: "© 2026 Immer Messen. All rights reserved.",
    defaultPrivacyLabel: "Privacy Policy and LGPD",
    defaultLgpdText:
      "We use cookies to improve your browsing experience. By continuing, you agree with our Privacy Policy.",
    defaultLgpdAccept: "Accept",
    defaultLgpdMore: "Learn more",
  },
  es: {
    skipLink: "Saltar al contenido",
    menuLabel: "Abrir menú",
    langLabel: "Seleccionar idioma",
    footerMenuTitle: "MENÚ",
    ariaNavigation: "Navegación principal",
    ariaCookieDialog: "Aviso de cookies",
    defaultFooterTagline: "Sensando el mundo a través de la fibra óptica",
    defaultFooterRights: "© 2026 Immer Messen. Todos los derechos reservados.",
    defaultPrivacyLabel: "Política de Privacidad y LGPD",
    defaultLgpdText:
      "Utilizamos cookies para mejorar su experiencia en el sitio. Al continuar navegando, usted acepta nuestra Política de Privacidad.",
    defaultLgpdAccept: "Aceptar",
    defaultLgpdMore: "Saber más",
  },
};

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

export function getDictionary(locale: SupportedLocale): Dictionary {
  return dictionaries[locale];
}
