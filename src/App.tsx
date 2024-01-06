import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/Header";
import SideBar from "./components/organisms/SideBar";
import { ROUTES } from "./utils/routes";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { getProductsChunk } from "./redux/slices/products";
import { category } from "./types/products";
import ProductCart from "./pages/ProductCart";
import Order from "./pages/Order";
import { getUserThunk } from "./redux/slices/user";
import { PUBLIC_KEY_EMAILER, initialUserState } from "./utils/const";
import emailjs from "@emailjs/browser";

function App() {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((store) => store.products);

  useEffect(() => {
    dispatch(getProductsChunk({ category: category.ALL }));
    dispatch(getUserThunk(initialUserState.id));
  }, [dispatch]);

  useEffect(() => emailjs.init(PUBLIC_KEY_EMAILER), []);

  return (
    <BrowserRouter>
      <Header />
      {error ? null : <SideBar />}
      <main
        className={`p-0 bg-primary height-full min-h-screen relative mt-[85px] ml-[85px] p-[93px] font-inter ${
          error || loading
            ? "bg-[#fff] w-full h-screen justify-center items-center flex ml-0 p-0"
            : ""
        } `}
      >
        <Routes>
          <Route path={ROUTES.main}>
            <Route index element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/basket" element={<ProductCart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
