import React, { useState, useEffect, useCallback } from "react";
import SearchHints from "./SearchHints";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getProductsChunk } from "../../redux/slices/products";

const Search = () => {
  const { selectedCategory } = useAppSelector((store) => store.sidebar);
  const { cart } = useAppSelector((store) => store.cart);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setSearch(inputValue);

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const newDebounceTimeout = setTimeout(() => {
        dispatch(
          getProductsChunk({
            category: selectedCategory,
            search: inputValue,
            cartItems: cart.map((it) => it.productId),
          })
        );
      }, 400);

      setDebounceTimeout(newDebounceTimeout);
    },
    [debounceTimeout, dispatch, selectedCategory, cart]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className="w-[560px] bg-[#EAEAEA] h-[58px] rounded-lg flex relative">
      <div className="bg-[#EAEAEA] rounded-bl-lg rounded-tl-lg px-6 py-3">
        <img src="/images/search.svg" alt="search" />
      </div>
      <div className="relative w-full">
        <input
          value={search}
          onChange={handleInputChange}
          className="focus:outline-none w-full bg-[#FBF8F8] rounded-br-lg rounded-tr-lg text-[#435C6B] p-[17px]"
          type="text"
          placeholder="Search"
        />
        <SearchHints searhString={search} />
      </div>
    </div>
  );
};

export default Search;
