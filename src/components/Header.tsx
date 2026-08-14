import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { site } from "@/data/site";
import { siteHref } from "@/lib/site-href";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = open
      ? window.setTimeout(
          () => mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
          40,
        )
      : undefined;
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      if (focusTimer) window.clearTimeout(focusTimer);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="wrap nav-inner">
        <Brand />
        <nav className="nav-links" aria-label="Головна навігація">
          {site.nav.map((item) => (
            <a key={item.label} href={siteHref(item.to)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn nav-cta" href={siteHref("/#contact")}>
          Записатися
        </a>
        <button
          ref={menuButtonRef}
          className={`nav-burger${open ? " open" : ""}`}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          aria-controls="nav-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        ref={mobileNavRef}
        className={`nav-mobile${open ? " open" : ""}`}
        id="nav-mobile"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        {site.nav.map((item) => (
          <a key={item.label} href={siteHref(item.to)} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="btn" href={siteHref("/#contact")} onClick={() => setOpen(false)}>
          Записатися
        </a>
        {site.contactDataReady ? (
          <a className="nav-mobile-phone" href={site.phonePrimaryHref}>
            {site.phonePrimary}
          </a>
        ) : (
          <span className="nav-mobile-phone nav-mobile-placeholder">Контактні дані готуються</span>
        )}
      </div>
    </header>
  );
}
