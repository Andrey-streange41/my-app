import { useState } from "react";
import Select from "react-tailwindcss-select";

interface ISelectDefault {
  options: { value: string; label: string }[];
  handleSelect: (value: { value: string; label: string }) => void;
}

export function SelectDefault({ options, handleSelect }: ISelectDefault) {
  const [sort, setSort] = useState(null);

  const handleChange = (option: any) => {
    setSort(option);
    handleSelect(option);
  };

  return (
    <div className="w-3/12">
      <Select
        placeholder="Sort"
        primaryColor=""
        value={sort}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
