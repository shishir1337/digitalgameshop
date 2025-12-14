export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Alphabetic A-Z',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Latest arrivals' },
  { slug: 'priceInUSD', reverse: false, title: 'Price: Low to high' }, // asc
  { slug: '-priceInUSD', reverse: true, title: 'Price: High to low' },
]



// Hero Images Configuration
export const heroImages = [
  {
    src: "/images/sliderimage1.webp",
    alt: "MLBB x Attack on Titan Collab - Up to 20% Off",
    link: "/products1",
    color: "#66190d",
  },
  {
    src: "/images/slider2.webp",
    alt: "Epic Recharge Rewards - Limited Time Bonus Campaign",
    link: "/products2",
    color: "#010004",
  },
  {
    src: "/images/slider 3.webp",
    alt: "Where Winds Meet - Now Available in SEAGM",
    link: "/products3",
    color: "#000100",
  },
  {
    src: "/images/slider4.webp",
    alt: "TeraBox AI-Powered Cloud - Save up to 15%",
    link: "/products4",
    color: "#dd2234",
  },
  {
    src: "/images/slider5.webp",
    alt: "Beast Era Guardianship - Now Available",
    link: "/products5",
    color: "#090b42",
  },
] as const

// Exclusive Offers Configuration
export const exclusiveOffers = [
  {
    id: "1",
    name: "Blood Strike Golds",
    sku: "5000 + 800 Golds",
    image: "https://seagm-media.seagmcdn.com/icon_400/2101.jpg?x-oss-process=image/resize,w_120",
    link: "/blood-strike-gold-top-up?ps=Home-Special-Deals&item_id=24803",
    discount: "-13.0%",
  },
  {
    id: "2",
    name: "PlayStation Network Card (UK)",
    sku: "PSN Card 200 GBP UK",
    image: "https://seagm-media.seagmcdn.com/icon_400/309.jpg?x-oss-process=image/resize,w_120",
    link: "/playstation-network-card-psn-united-kingdom?ps=Home-Special-Deals&item_id=18326",
    discount: "-7.0%",
  },
  {
    id: "3",
    name: "Sword of Justice Mobile SEA Ornate Jades Top Up",
    sku: "6480 +1296 Ornate Jades",
    image: "https://seagm-media.seagmcdn.com/icon_400/3211.jpg?x-oss-process=image/resize,w_120",
    link: "/sword-of-justice-mobile-sea-top-up?ps=Home-Special-Deals&item_id=25364",
    discount: "-6.0%",
  },
  {
    id: "4",
    name: "PlayStation Network Card (MX)",
    sku: "PSN Card 100 USD MX",
    image: "https://seagm-media.seagmcdn.com/icon_400/2024.jpg?x-oss-process=image/resize,w_120",
    link: "/playstation-network-card-psn-mexico?ps=Home-Special-Deals&item_id=21020",
    discount: "-2.0%",
  },
  {
    id: "5",
    name: "AFK Journey Top Up",
    sku: "3150 Dragon Crystals",
    image: "https://seagm-media.seagmcdn.com/icon_400/2645.jpg?x-oss-process=image/resize,w_120",
    link: "/afk-journey-top-up?ps=Home-Special-Deals&item_id=20637",
    discount: "-9.0%",
  },
  {
    id: "6",
    name: "PlayStation Network Card (SG)",
    sku: "PSN Card 100 SGD SG",
    image: "https://seagm-media.seagmcdn.com/icon_400/271.jpg?x-oss-process=image/resize,w_120",
    link: "/playstation-network-card-psn-singapore?ps=Home-Special-Deals&item_id=8701",
    discount: "-1.0%",
  },
  {
    id: "7",
    name: "PlayStation Network Card (CA)",
    sku: "PSN Card 150 CAD CA",
    image: "https://seagm-media.seagmcdn.com/icon_400/566.jpg?x-oss-process=image/resize,w_120",
    link: "/playstation-network-card-psn-canada?ps=Home-Special-Deals&item_id=11862",
    discount: "-3.0%",
  },
  {
    id: "8",
    name: "Crystal of Atlan Asia Top Up",
    sku: "6,480 Opals + 2,126 Bonus",
    image: "https://seagm-media.seagmcdn.com/icon_400/3017.jpg?x-oss-process=image/resize,w_120",
    link: "/crystal-of-atlan-asia-top-up?ps=Home-Special-Deals&item_id=23744",
    discount: "-9.0%",
  },
  {
    id: "9",
    name: "Free Fire Diamonds (LATAM)",
    sku: "5600+560 Diamonds",
    image: "https://seagm-media.seagmcdn.com/icon_400/1695.jpg?x-oss-process=image/resize,w_120",
    link: "/free-fire-latam-diamonds-top-up?ps=Home-Special-Deals&item_id=12416",
    discount: "-11.0%",
  },
  {
    id: "10",
    name: "PlayStation Network Card (PL)",
    sku: "PSN Card 500 PLN PL",
    image: "https://seagm-media.seagmcdn.com/icon_400/462.jpg?x-oss-process=image/resize,w_120",
    link: "/playstation-network-card-psn-poland?ps=Home-Special-Deals&item_id=18324",
    discount: "-2.0%",
  },
] as const
