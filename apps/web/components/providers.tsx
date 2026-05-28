"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "@/lib/store/store";
import { setLocale } from "@/lib/store/ui-slice";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
};

export function Providers({ children, locale }: ProvidersProps) {
  useEffect(() => {
    store.dispatch(setLocale(locale));
    document.documentElement.lang = locale;
  }, [locale]);

  return <Provider store={store}>{children}</Provider>;
}
