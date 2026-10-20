"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav } from "@/content";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between lg:h-20">
        <a href="#top" aria-label="현샘영수 처음으로" onClick={() => setOpen(false)}>
          <Image src="/logo-header.png" alt="현샘영수 ENGLISH & MATH" width={901} height={300} priority className="h-9 w-auto lg:h-11" />
        </a>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="t-small text-ink transition-colors hover:text-navy">
              {n.label}
            </a>
          ))}
          <a href="#consult" className="t-small inline-flex h-10 items-center rounded-md bg-navy px-5 font-semibold text-white transition-colors hover:bg-navy-deep">
            상담 신청
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen(!open)}
        >
          <span className={`h-px w-6 bg-navy transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-navy transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-navy transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      <nav id="mobile-menu" aria-label="모바일 메뉴" hidden={!open} className="border-t border-navy/10 bg-white lg:hidden">
        <ul className="wrap py-2">
          {nav.map((n) => (
            <li key={n.href} className="border-b border-navy/10 last:border-0">
              <a href={n.href} onClick={() => setOpen(false)} className="block py-4 text-base text-navy">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
