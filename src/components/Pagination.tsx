import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../hooks/reduxHooks";

interface IPagination {
  onChange: (newPage: number) => void;
}

export function Pagination({ onChange }: IPagination) {
  const [active, setActive] = React.useState(1);
  const { pages } = useAppSelector((store) => store.products);

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        setActive(index);
        onChange(index);
      },
    } as any);

  const next = () => {
    if (active === pages) return;
    onChange(active + 1);
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    onChange(active - 1);
    setActive(active - 1);
  };

  const buttons = Array.from({ length: pages }, (_, index) => (
    <IconButton key={index + 1} {...getItemProps(index + 1)}>
      {index + 1}
    </IconButton>
  ));

  return (
    <div style={{display:!pages || pages === 1?'none':'flex'}} className="flex items-center gap-4">
      <Button
        placeholder={"1"}
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
       {buttons}
      </div>
      <Button
        placeholder={"2"}
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === pages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
