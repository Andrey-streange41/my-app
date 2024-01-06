import React from "react";
import { SelectDefault } from "./Select";
import { sortOptions } from "../../utils/const";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { sort } from "../../redux/slices/products";

const ToolPanel = () => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((store) => store.products);
  const handleSelectSort = (option: { value: string; label: string }) => {
    dispatch(sort(option.value));
  };
  if (error || loading) return <></>;

  return (
    <div className="w-10/12 bg-secondary h-[85px] rounded-lg flex items-center px-9 justify-start">
      <SelectDefault options={sortOptions} handleSelect={handleSelectSort} />
    </div>
  );
};

export default ToolPanel;
