import { site } from "@/data/site";

export function StickyCallButton() {
  return (
    <a className="mobile-call-bar" href={site.phonePrimaryHref}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />
      </svg>
      Зателефонувати
    </a>
  );
}
