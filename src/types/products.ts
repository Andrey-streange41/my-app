export interface IProduct {
  price: number;
  image: string;
  title: string;
  category: category;
  description: string;
  id: number;
  rating: IRate;
  quantity: number;
}

export interface IRate {
  rate: number;
  count: number;
}

export enum category {
  WOMENCLOTH = "women's clothing",
  MANCLOTH = "men's clothing",
  JEWELERY = "jewelery",
  ELECTRONICS = "electronics",
  ALL = "all",
}

export interface IQuery {
  category?: category;
  search?: string;
}
