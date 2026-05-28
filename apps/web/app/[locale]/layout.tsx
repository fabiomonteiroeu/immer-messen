import { notFound } from "next/navigation";

import { PreviewBanner } from "@/components/ui/preview-banner";
import { SiteShell } from "@/components/ui/site-shell";
import { Providers } from "@/components/providers";
import { getCookieBanner } from "@/lib/cms/cookie-banner";
import { getFooter } from "@/lib/cms/footer";
import { getGlobalSetting } from "@/lib/cms/global";
import { getDictionary, isSupportedLocale, type SupportedLocale } from "@/lib/i18n/config";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as SupportedLocale;
  const dictionary = getDictionary(typedLocale);

  const [global, footer, cookieBanner] = await Promise.all([
    getGlobalSetting(typedLocale),
    getFooter(typedLocale),
    getCookieBanner(typedLocale),
  ]);

  return (
    <Providers locale={typedLocale}>
      <PreviewBanner />
      <SiteShell
        cookieBanner={cookieBanner}
        dictionary={dictionary}
        footer={footer}
        global={global}
      >
        {children}
      </SiteShell>
    </Providers>
  );
}
