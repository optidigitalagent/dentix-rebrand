export const site = {
  name: "DENTIX",
  tagline: "Стоматологічна клініка",
  /** Замініть на завантажений файл логотипу DENTIX (src/assets/logo.png) */
  logo: "" as string,
  phonePrimary: "[Телефон]",
  phonePrimaryHref: "tel:+380000000000",
  phoneSecondary: "[Телефон 2]",
  phoneSecondaryHref: "tel:+380000000001",
  address: "[Адреса клініки DENTIX]",
  city: "[Місто]",
  schedule: "[Графік]",
  scheduleNote: "Нд · [вихідний]",
  instagram: "[Instagram]",
  instagramHref: "#",
  mapEmbed:
    "https://www.google.com/maps?q=Kyiv&output=embed",
  mapLink: "https://www.google.com/maps",
  nav: [
    { label: "Послуги", to: "/#services" },
    { label: "Ортодонтія", to: "/ortodontiya.html" },
    { label: "Про клініку", to: "/#about" },
    { label: "Сертифікати", to: "/#certificates" },
    { label: "Кейси", to: "/#cases" },
    { label: "Ціни", to: "/price.html" },
    { label: "Контакти", to: "/#contact-info" },
  ],
  stats: [
    { num: "2", label: "номери для запису" },
    { num: "6", label: "напрямків лікування" },
    { num: "6", label: "днів роботи" },
  ],
  infoCards: [
    { title: "Відкритий прайс", text: "Основні послуги та ціни на окремій сторінці." },
    { title: "Запис телефоном", text: "Два номери клініки для запису на прийом." },
    { title: "Ортодонтія", text: "Консультація, брекет-системи та апарати." },
    { title: "Адреса", text: "Прийом за адресою: [Адреса]." },
  ],
};
