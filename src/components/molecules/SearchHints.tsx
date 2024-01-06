import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { IProduct } from "../../types/products";
import { Link } from "react-router-dom";

interface ISearchHints {
  searhString: string;
}

const SearchHints = ({ searhString }: ISearchHints) => {
  const [hintsGlobal, setHintsGlobal] = useState<IProduct[]>([]);
  const [simillarSearch, setSimmilarSearch] = useState<IProduct | undefined>(
    undefined
  );
  const [modalActive, setModalActive] = useState(false);
  const { products } = useAppSelector((store) => store.products);

  useEffect(() => {
    if (searhString) {
      setSimmilarSearch(
        products.find((it) =>
          it.title.toLocaleLowerCase().startsWith(searhString.toLowerCase())
        )
      );
      setHintsGlobal(
        products.filter((it) =>
          it.title.toLowerCase().includes(searhString.toLowerCase())
        )
      );
      return setModalActive(true);
    }
    return setModalActive(false);
  }, [searhString, products]);

  return (
    <div
      hidden={!modalActive || (!hintsGlobal.length && !simillarSearch)}
      className="absolute top-100 min-h-[100px] w-[479px] bg-secondary shadow-lg p-6 text-[#435C6B]"
    >
      <ul
        hidden={!hintsGlobal.length}
        className="flex flex-col gap-[10px] mb-2"
      >
        {hintsGlobal.slice(0, 4).map((it) => (
          <Link to={"/products/" + it.id}>
            <span className="cursor-pointer hover:text-[#766ED3] p-1">
              {it.title}
            </span>
          </Link>
        ))}
      </ul>
      <div className="border w-full mb-2"></div>
      <span hidden={!simillarSearch?.id} className="text-[#435C6B] font-bold">
        Goods
      </span>
      <Link to={"/products/" + simillarSearch?.id} className="w-full">
        <div
          style={{ display: !simillarSearch?.id ? "none" : "flex" }}
          className="flex gap-[10px] items-center cursor-pointer  hover:text-[#766ED3] "
        >
          <span >{simillarSearch?.title}</span>
          <img
            className="w-[40px] h-[40px]"
            src={simillarSearch?.image}
            alt="simillar hint"
          />
        </div>
      </Link>
    </div>
  );
};

export default SearchHints;
