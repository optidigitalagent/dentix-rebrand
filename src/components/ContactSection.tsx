import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const contactSlots = [
  { label: "Телефон", value: site.phonePrimary },
  { label: "Адреса", value: `${site.address}, ${site.city}` },
  { label: "Графік", value: site.schedule },
  { label: "Соціальні мережі", value: site.instagram },
];

export function ContactSection() {
  return (
    <section className="section contact contact-stage" id="contact">
      <div className="wrap">
        <SectionHeading
          kicker="Запис"
          title="Заплануйте візит до DENTIX"
          lede="Структура запису вже готова. Підтверджені контакти та канал доставки форми будуть підключені окремо — без вигаданих даних і хибних повідомлень про успіх."
          center={false}
        />

        <div className="contact-composition">
          <Reveal as="aside" className="contact-rail">
            <span className="contact-rail-index" aria-hidden="true">
              01
            </span>
            <p className="contact-rail-kicker">Швидкий зв’язок</p>
            <h3>Усе потрібне для запису — в одному місці</h3>
            <p className="contact-rail-copy">
              Після підтвердження даних тут з’являться робочі номери, адреса, графік і посилання на
              соціальні мережі.
            </p>

            <div className="contact-slots" aria-label="Контактні дані готуються">
              {contactSlots.map((item) => (
                <div className="contact-slot" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="contact-data-state" role="status">
              <span className="contact-state-dot" aria-hidden="true" />
              Дані очікують підтвердження власника
            </div>
          </Reveal>

          <Reveal as="div" className="contact-panel" delay={90}>
            <div className="contact-panel-head">
              <div>
                <p className="contact-panel-kicker">Форма запису</p>
                <h3>Залишити заявку</h3>
              </div>
              <span className="contact-panel-status">Попередній перегляд</span>
            </div>

            <form
              className="form"
              onSubmit={(event) => event.preventDefault()}
              aria-describedby="booking-preview-note"
            >
              <div className="form-row">
                <label className="field">
                  <span>Ім’я</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше ім’я"
                    disabled={!site.bookingFormReady}
                  />
                </label>
                <label className="field">
                  <span>Телефон</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+380 __ ___ __ __"
                    disabled={!site.bookingFormReady}
                  />
                </label>
              </div>
              <label className="field">
                <span>Напрямок</span>
                <select name="topic" defaultValue="Консультація" disabled={!site.bookingFormReady}>
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
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Зручний час для дзвінка"
                  disabled={!site.bookingFormReady}
                />
              </label>
              <button className="btn btn-block" type="submit" disabled={!site.bookingFormReady}>
                Форма буде доступна після підключення
              </button>
              <p className="booking-note" id="booking-preview-note">
                Відправлення вимкнене, доки не підключено реальний канал доставки заявок. Форма не
                показує фальшивий success state.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
