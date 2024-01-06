import { category } from "./products";

export interface ISidebar {
  title: string;
  link: string;
  icon: IIcon;
  id: number;
  active: boolean;
  subItems?: ISidebar[];
  category?: category;
}

export interface IIcon {
  alt: string;
  url: string;
}
