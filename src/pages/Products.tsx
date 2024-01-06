import { useState } from "react";
import { Pagination } from "../components/Pagination";
import ProductCardList from "../components/molecules/ProductCardList";
import ToolPanel from "../components/molecules/ToolPanel";
import { useAppSelector } from "../hooks/reduxHooks";
import Loader from "../components/atoms/Loader";

const Products = () => {
  const [page, setPage] = useState(1);
  const { error, loading } = useAppSelector((store) => store.products);

  return (
    <div className="flex flex-col gap-[40px] items-center ">
      <ToolPanel />
      {loading ? <Loader /> : null}
      <ProductCardList page={page} />
      <Pagination onChange={setPage} />
      {error && !loading ? (
        <img
          className=" w-12/12 "
          src="/images/serverError.png"
          alt="server error"
        />
      ) : null}
    </div>
  );
};

export default Products;
