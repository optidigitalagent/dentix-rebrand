import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { ContactSection } from "@/components/ContactSection";
import { BackToTopButton } from "@/components/BackToTopButton";
import { priceBlocks } from "@/data/prices";
import { site } from "@/data/site";
import priceHeroImg from "@/assets/about-2.jpg";
import { siteHref } from "@/lib/site-href";

const title = "Ціни на стоматологічні послуги — DENTIX";
const description =
  "Структура прайсу DENTIX: профілактика, пародонтологія, терапія, ортодонтія, ортопедія та хірургія. Непідтверджені ціни чесно позначені як чернетка даних.";

export const Route = createFileRoute("/price.html")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricePage,
});

function PricePage() {
  return (
    <SiteLayout>
      <section className="price-hero">
        <div className="wrap price-hero-grid">
          <div className="price-hero-copy">
            <nav className="breadcrumbs" aria-label="Навігація">
              <a href={siteHref("/")}>Головна</a> <span aria-hidden="true">/</span>{" "}
              <span>Ціни</span>
            </nav>
            <p className="eyebrow">Прайс клініки</p>
            <h1 className="hero-title">Ціни DENTIX</h1>
            <p className="service-intro">
              Структура прайсу готова до наповнення. Поки вартість не підтверджена клінікою, кожна
              позиція чесно позначена як чернетка даних.
            </p>
            <div className="hero-actions">
              {site.contactDataReady ? (
                <a className="btn" href={site.phonePrimaryHref}>
                  {site.phonePrimary}
                </a>
              ) : (
                <a className="btn" href={siteHref("/#contact-info")}>
                  Контактні дані готуються
                </a>
              )}
              <a className="btn btn-ghost" href={siteHref("/#contact")}>
                Перейти до запису <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <figure className="price-hero-media" data-content-slot="price-hero">
            <img
              src={priceHeroImg}
              alt="Візуальний блок сторінки цін DENTIX"
              width={1000}
              height={1200}
            />
            <figcaption>Візуальний слот прайсу</figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap price-content">
        <nav className="price-quick" aria-label="Категорії прайсу">
          {priceBlocks.map((b) => (
            <a key={b.id} href={`#${b.id}`}>
              {b.kicker}
            </a>
          ))}
        </nav>

        <div className="price-list">
          {priceBlocks.map((b, i) => (
            <Reveal className="price-block" id={b.id} key={b.id} delay={i * 50}>
              <div className="price-block-head">
                {b.num ? <span className="price-block-num">{b.num}</span> : null}
                <div>
                  <span className="sec-kicker">{b.kicker}</span>
                  <h2 className="price-block-title">{b.title}</h2>
                </div>
              </div>
              <ul>
                {b.rows.map((r) => (
                  <li className="price-row" key={r.name}>
                    <span className="price-name">{r.name}</span>
                    <span className="price-cost">{r.cost}</span>
                  </li>
                ))}
              </ul>
              {b.note ? <p className="price-note">{b.note}</p> : null}
              {b.link ? (
                <a className="price-service-link" href={siteHref(b.link.href)}>
                  {b.link.label}
                </a>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>

      <ContactSection />
      <BackToTopButton />
    </SiteLayout>
  );
}
