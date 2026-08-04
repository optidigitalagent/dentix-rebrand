import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCallButton } from "./StickyCallButton";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="top">{children}</main>
      <Footer />
      <StickyCallButton />
    </>
  );
}
