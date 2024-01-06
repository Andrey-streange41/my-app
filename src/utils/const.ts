import { category } from "../types/products";
import { ISidebar } from "../types/sidebar";
import { IUser } from "../types/user";

export const LIMIT = 6;

export const sidebarItems: ISidebar[] = [
  {
    link: "/",
    active: true,
    id: 1,
    title: "Home",
    icon: {
      alt: "home",
      url: "/images/home.svg",
    },
  },
  {
    link: "",
    active: false,
    id: 2,
    icon: {
      alt: "categories",
      url: "/images/category.svg",
    },
    title: "Categories",
    subItems: [
      {
        link: "",
        active: true,
        id: 5,
        icon: {
          alt: "all",
          url: "/images/all-cat.webp",
        },
        title: "All",
        category: category.ALL,
      },
      {
        link: "",
        active: false,
        id: 3,
        icon: {
          alt: "man_clothing",
          url: "/images/clothing.svg",
        },
        title: "M clothing",
        category: category.MANCLOTH,
      },
      {
        link: "",
        active: false,
        id: 6,
        icon: {
          alt: "women_clothing",
          url: "/images/women-clos.png",
        },
        title: "W clothing",
        category: category.WOMENCLOTH,
      },
      {
        link: "",
        active: false,
        id: 4,
        icon: {
          alt: "electronics",
          url: "/images/electro.svg",
        },
        title: "Electronics",
        category: category.ELECTRONICS,
      },
    ],
  },
];

export const sortOptions = [
  {
    value: "Price",
    label: "Price",
  },
  {
    value: "Title",
    label: "Title",
  },
  {
    value: "Rate",
    label: "Rate",
  },
];

export const initialUserState: IUser = {
  id: 1,
  username: "anonimus",
  tel: "",
  email: "",
};
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const telRegex = /^\+380\d{9}$/;

export const PUBLIC_KEY_EMAILER = `u91X94_6zQe4_0hSx`;
export const SERVICE_KEY_EMAILER = "service_p2m19dy";
export const TEMPLATE_KEY_EMAILER = "template_x9w8ej1";
