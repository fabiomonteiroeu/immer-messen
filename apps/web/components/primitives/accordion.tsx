"use client";

import { useId, useState } from "react";

export type AccordionItemData = {
  value: string;
  title: string;
  content: React.ReactNode;
};

type ApprovedAccordionProps = {
  items: AccordionItemData[];
};

export function ApprovedAccordion({ items }: ApprovedAccordionProps) {
  const [openValue, setOpenValue] = useState<string | null>(null);
  const groupId = useId();

  return (
    <div className="accordion-list">
      {items.map((item) => {
        const open = openValue === item.value;
        const panelId = `${groupId}-${item.value}-panel`;
        const buttonId = `${groupId}-${item.value}-button`;

        return (
          <div className={`accordion${open ? " open" : ""}`} key={item.value}>
            <button
              aria-controls={panelId}
              aria-expanded={open}
              className="accordion__head"
              id={buttonId}
              onClick={() => setOpenValue(open ? null : item.value)}
              type="button"
            >
              <span>{item.title}</span>
              <svg
                className="chev"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              aria-labelledby={buttonId}
              className="accordion__body"
              id={panelId}
              role="region"
            >
              <div className="accordion__body-inner">
                {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
