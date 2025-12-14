export interface Product {
  id: string
  title: string
  region: string
  image: string
  link: string
}

export interface GameCardCategory {
  title: string
  viewMoreLink: string
  products: Product[]
}

