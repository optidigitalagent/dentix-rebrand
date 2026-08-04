import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqList } from "@/components/FaqList";
import { ContactSection } from "@/components/ContactSection";
import { orthodontics as o } from "@/data/orthodontics";
import { site } from "@/data/site";

const title = "Ортодонтія та брекети — клініка DENTIX";
const description =
  "Ортодонтичне лікування у DENTIX: консультація ортодонта, план лікування, лігатурні та самолігуючі брекет-системи, ортодонтичні апарати.";

export const Route = createFileRoute("/ortodontiya/html")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrthoPage,
});

function OrthoPage() {
  return (
    <SiteLayout>
      <section className="service-hero">
        <div className="wrap service-hero-grid">
          <div className="service-hero-copy">
            <nav className="breadcrumbs" aria-label="Навігація">
              <a href="/">Головна</a> <span aria-hidden="true">/</span> <span>Ортодонтія</span>
            </nav>
            <p className="eyebrow">{o.eyebrow}</p>
            <h1 className="hero-title">{o.h1}</h1>
            <p className="service-intro">{o.intro}</p>
            <div className="hero-actions">
              <a className="btn" href="#contact">
                Записатися на консультацію
              </a>
              <a className="btn btn-ghost" href="/price.html#ortodontiya">
                Ціни на ортодонтію <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <Reveal className="service-summary">
            <h2>Коротко</h2>
            <ul>
              {o.summary.map((s) => (
                <li key={s.name}>
                  <span className="price-name">{s.name}</span>
                  <span className="price-cost">{s.cost}</span>
                </li>
              ))}
            </ul>
            <a className="btn btn-block" href={site.phonePrimaryHref}>
              {site.phonePrimary}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="service-trust">
        <div className="wrap service-trust-grid">
          {o.trust.map((t, i) => (
            <Reveal className="trust-item" key={t.title} delay={i * 70}>
              <div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap service-two-col">
          <Reveal className="service-prose">
            <span className="sec-kicker">{o.overview.kicker}</span>
            <h2 className="sec-title">{o.overview.title}</h2>
            {o.overview.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="medical-note">{o.overview.note}</p>
          </Reveal>

          <Reveal className="treatment-options" delay={80}>
            {o.options.map((opt) => (
              <article className="treatment-card" key={opt.num}>
                <span className="treatment-num">{opt.num}</span>
                <h3>{opt.title}</h3>
                <p>{opt.text}</p>
                {opt.list ? (
                  <ul>
                    {opt.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                ) : null}
                {opt.link ? (
                  <a className="svc-link" href={opt.link.href}>
                    {opt.link.label}
                  </a>
                ) : null}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading kicker="Етапи" title="Як проходить лікування" />
          <ol className="steps-list">
            {o.steps.map((s, i) => (
              <Reveal as="li" key={s.num} delay={i * 60}>
                <span className="treatment-num">{s.num}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-layout">
          <SectionHeading kicker="Питання" title="Часті запитання" center={false} />
          <FaqList items={o.faq} />
        </div>
      </section>

      <section className="service-cta">
        <div className="wrap service-cta-inner">
          <h2>Потрібна консультація ортодонта?</h2>
          <div className="service-cta-actions">
            <a className="btn" href={site.phonePrimaryHref}>
              {site.phonePrimary}
            </a>
            <a className="btn btn-ghost" href="/price.html#ortodontiya">
              Прайс
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
    </SiteLayout>
  );
}
