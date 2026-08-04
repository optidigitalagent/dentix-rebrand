import { useState } from "react";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <SectionHeading
          kicker="Запис"
          title="Записатися на прийом"
          lede="Зателефонуйте або залиште заявку — адміністратор передзвонить і підтвердить час."
        />

        <div className="contact-form-wrap">
          <Reveal className="booking-callout">
            <p className="booking-note">Найшвидший спосіб — телефонний дзвінок:</p>
            <div className="booking-phone-actions">
              <a className="btn" href={site.phonePrimaryHref}>
                {site.phonePrimary}
              </a>
              <a className="btn btn-ghost" href={site.phoneSecondaryHref}>
                {site.phoneSecondary}
              </a>
            </div>
          </Reveal>

          <Reveal as="form" className="form" delay={80} onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            setSent(true);
          }}>
            <label className="field">
              <span>Ім'я</span>
              <input type="text" name="name" required placeholder="Ваше ім'я" />
            </label>
            <label className="field">
              <span>Телефон</span>
              <input type="tel" name="phone" required placeholder="+380 __ ___ __ __" />
            </label>
            <label className="field">
              <span>Напрямок</span>
              <select name="topic" defaultValue="Консультація">
                <option>Консультація</option>
                <option>Профілактика</option>
                <option>Терапія</option>
                <option>Пародонтологія</option>
                <option>Ортодонтія</option>
                <option>Ортопедія</option>
                <option>Хірургія</option>
              </select>
            </label>
            <label className="field">
              <span>Коментар</span>
              <textarea name="message" rows={4} placeholder="Зручний час для дзвінка" />
            </label>
            <button className="btn btn-block" type="submit">
              {sent ? "Заявку надіслано" : "Надіслати заявку"}
            </button>
            <p className="booking-note">
              {sent
                ? "Дякуємо! Адміністратор зв'яжеться з вами найближчим часом."
                : "Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних."}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
