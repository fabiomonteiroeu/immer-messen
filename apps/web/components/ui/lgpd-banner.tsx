"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setLgpdAccepted } from "@/lib/store/ui-slice";
import { uiStorageKeys } from "@/lib/ui/constants";

type LgpdBannerProps = {
  text: string;
  accept: string;
  more: string;
  privacyHref: string;
  ariaLabel?: string;
};

export function LgpdBanner({ text, accept, more, privacyHref, ariaLabel }: LgpdBannerProps) {
  const dispatch = useAppDispatch();
  const accepted = useAppSelector((state) => state.ui.lgpdAccepted);
  const [visible, setVisible] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const storedAccepted = window.localStorage.getItem(uiStorageKeys.lgpdAccepted) === "1";
    if (storedAccepted) {
      dispatch(setLgpdAccepted(true));
      setRemoved(true);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 1400);
    return () => window.clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (accepted) {
      setVisible(false);
      const timer = window.setTimeout(() => setRemoved(true), 500);
      return () => window.clearTimeout(timer);
    }
  }, [accepted]);

  if (removed) {
    return null;
  }

  return (
    <aside
      aria-label={ariaLabel ?? "Aviso de cookies"}
      className={`lgpd-banner${visible ? " show" : ""}`}
      role="dialog"
    >
      <p>{text}</p>
      <div className="lgpd-banner__actions">
        <button
          className="btn btn-primary lgpd-accept"
          onClick={() => {
            window.localStorage.setItem(uiStorageKeys.lgpdAccepted, "1");
            dispatch(setLgpdAccepted(true));
          }}
          type="button"
        >
          {accept}
        </button>
        <Link href={privacyHref}>{more}</Link>
      </div>
    </aside>
  );
}
