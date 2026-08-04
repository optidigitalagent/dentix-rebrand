export type PriceRow = { name: string; cost: string };
export type PriceBlock = {
  id: string;
  num: string | null;
  kicker: string;
  title: string;
  rows: PriceRow[];
  note?: string;
  link?: { label: string; href: string };
};

export const priceBlocks: PriceBlock[] = [
  {
    id: "zagalni",
    num: null,
    kicker: "Загальні",
    title: "Консультація та діагностика",
    rows: [
      { name: "Консультація", cost: "уточнюйте" },
      { name: "Дентальний знімок", cost: "уточнюйте" },
    ],
  },
  {
    id: "profilaktyka",
    num: "01",
    kicker: "Профілактика",
    title: "Профілактичні процедури",
    rows: [
      { name: "Професійна гігієна з використанням Air-flow", cost: "уточнюйте" },
      { name: "Косметична гігієна", cost: "уточнюйте" },
      { name: "Відбілювання зубів", cost: "уточнюйте" },
    ],
  },
  {
    id: "parodontologiya",
    num: "02",
    kicker: "Пародонтологія",
    title: "Пародонтологічне лікування",
    rows: [
      { name: "Vector-терапія", cost: "уточнюйте" },
      { name: "Підтримуючий курс Vector-терапії", cost: "уточнюйте" },
      { name: "Пародонтологічне лікування", cost: "уточнюйте" },
    ],
  },
  {
    id: "terapiya",
    num: "03",
    kicker: "Терапія",
    title: "Терапія",
    rows: [
      { name: "Консультація", cost: "уточнюйте" },
      { name: "Лікування карієсу", cost: "уточнюйте" },
      { name: "Лікування каналів", cost: "уточнюйте" },
      { name: "Пряма реставрація зубів", cost: "уточнюйте" },
    ],
  },
  {
    id: "ortodontiya",
    num: "04",
    kicker: "Ортодонтія",
    title: "Ортодонтичне лікування",
    rows: [
      { name: "Консультація ортодонта", cost: "уточнюйте" },
      { name: "Зняття відбитків та складання плану лікування", cost: "уточнюйте" },
      { name: "Брекет-система", cost: "уточнюйте" },
      { name: "Ортодонтичний апарат", cost: "уточнюйте" },
    ],
    note: "Повну вартість індивідуального плану визначають після діагностики.",
    link: {
      label: "Детальніше про ортодонтичне лікування та брекет-системи →",
      href: "/ortodontiya.html",
    },
  },
  {
    id: "ortopediya",
    num: "05",
    kicker: "Ортопедія",
    title: "Ортопедична стоматологія",
    rows: [
      { name: "Коронка", cost: "уточнюйте" },
      { name: "Вінір", cost: "уточнюйте" },
    ],
  },
  {
    id: "hirurgiya",
    num: "06",
    kicker: "Хірургія",
    title: "Хірургічна стоматологія",
    rows: [
      { name: "Видалення зуба", cost: "уточнюйте" },
      { name: "Встановлення імпланта", cost: "уточнюйте" },
    ],
  },
];
