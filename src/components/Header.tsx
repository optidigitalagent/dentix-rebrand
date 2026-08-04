import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { site } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="wrap nav-inner">
        <Brand />
        <nav className="nav-links" aria-label="Головна навігація">
          {site.nav.map((item) => (
            <a key={item.label} href={item.to}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn nav-cta" href="/#contact">
          Записатися
        </a>
        <button
          className={`nav-burger${open ? " open" : ""}`}
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile${open ? " open" : ""}`} id="nav-mobile">
        {site.nav.map((item) => (
          <a key={item.label} href={item.to} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="btn" href="/#contact" onClick={() => setOpen(false)}>
          Записатися
        </a>
        <a className="nav-mobile-phone" href={site.phonePrimaryHref}>
          {site.phonePrimary}
        </a>
      </div>
    </header>
  );
}
