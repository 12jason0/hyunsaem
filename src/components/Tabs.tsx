"use client";

import { useRef, useState } from "react";

type Tab = { id: string; label: string; content: React.ReactNode };

// WAI-ARIA 탭 패턴: 좌우 화살표·Home·End로 이동
export default function Tabs({ label, tabs }: { label: string; tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex border-b border-navy/10 sm:justify-center">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`-mb-px flex-1 border-b-2 px-2 py-3.5 text-base transition-colors sm:flex-none sm:px-8 ${
              active === i ? "border-navy font-semibold text-navy" : "border-transparent text-muted hover:text-navy"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={active !== i} tabIndex={0}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
