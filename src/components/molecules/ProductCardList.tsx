import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import ProductCard from "../atoms/ProductCard";
import { LIMIT } from "../../utils/const";

interface IProductCardList {
  page: number;
}

const ProductCardList = ({ page }: IProductCardList) => {
  const [offset, setOffset] = useState(0);
  const { products,error, loading } = useAppSelector((store) => store.products);
  const { selectedCategory } = useAppSelector(
    (store) => store.sidebar
  );

  useEffect(() => {
    setOffset((page - 1) * LIMIT);
  }, [page]);

  useEffect(() => {
    setOffset(0);
  }, [selectedCategory]);

  return (
    <ul className="flex gap-[66px] w-full justify-center flex-wrap">
      {products.slice(offset, offset + LIMIT).map((card) => (
        <ProductCard key={card.id} card={card} />
      ))}
      {!products.length && !loading && !error ? <h1>Nothing found!</h1> : null}
    </ul>
  );
};

export default ProductCardList;
