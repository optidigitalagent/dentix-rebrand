import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ContactInfoSection() {
  return (
    <section className="section contact-info-section" id="contact-info">
      <div className="wrap">
        <SectionHeading kicker="Контакти" title="Як нас знайти" />
        <div className="contact-info">
          <Reveal className="info-stack">
            <div className="info-block">
              <h3>Адреса</h3>
              <p>
                {site.address}
                <br />
                {site.city}
              </p>
            </div>
            <div className="info-block">
              <h3>Телефони</h3>
              <p>
                <a href={site.phonePrimaryHref}>{site.phonePrimary}</a>
                <br />
                <a href={site.phoneSecondaryHref}>{site.phoneSecondary}</a>
              </p>
            </div>
            <div className="info-block">
              <h3>Графік роботи</h3>
              <p>
                {site.schedule}
                <br />
                {site.scheduleNote}
              </p>
            </div>
            <div className="info-block">
              <h3>Instagram</h3>
              <p>
                <a href={site.instagramHref} target="_blank" rel="noreferrer">
                  {site.instagram}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal className="contact-map" delay={80}>
            <iframe
              title="Карта розташування клініки DENTIX"
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="map-link" href={site.mapLink} target="_blank" rel="noreferrer">
              Відкрити на мапі <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
