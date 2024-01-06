export const ROUTES = {
  main: "/",
  products: "/products",
  basket: "/cart",
  order:'/order',
  routeChange: function (params: number | string) {
    const path = window.location.pathname.split("/")[1];
    return "/" + path + "/" + params;
  },
  stepBack: () => {
    const paths = window.location.pathname.split("/");
    paths.splice(paths.length - 1);
    return paths.join("/");
  },
};
