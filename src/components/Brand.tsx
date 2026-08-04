import { site } from "@/data/site";

export function Brand({ variant = "header" }: { variant?: "header" | "footer" }) {
  return (
    <a href="/" className={`brand${variant === "footer" ? " brand-foot" : ""}`} aria-label={site.name}>
      {site.logo ? (
        <img className="brand-logo" src={site.logo} alt={`Логотип ${site.name}`} />
      ) : (
        <svg className="brand-tooth" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 88c-6 0-7-13-9-24-1-7-4-10-8-10s-9 4-11-6c-2-11-4-24 3-31 6-6 16-4 25-4s19-2 25 4c7 7 5 20 3 31-2 10-7 6-11 6s-7 3-8 10c-2 11-3 24-9 24z" />
        </svg>
      )}
      <span className="brand-text">
        <span className="brand-word">{site.name}</span>
        <span className="brand-sub">{site.tagline}</span>
      </span>
    </a>
  );
}
