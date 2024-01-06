import { Link } from "react-router-dom";
import IconButton from "../atoms/IconButton";
import { IIcon, ISidebar } from "../../types/sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setActive, setSubItemActive } from "../../redux/slices/sidebar";
import { getProductsChunk } from "../../redux/slices/products";
import { category } from "../../types/products";

interface ISidebarItem {
  link: string;
  title: string;
  icon: IIcon;
  id: number;
  sidebarAtive: boolean;
  active: boolean;
  subItems?: ISidebar[] | undefined;
  parrentId: number;
  className?: string;
  itemCategory?: category;
}

const SidebarItem = ({
  link,
  icon,
  title,
  sidebarAtive,
  id,
  active,
  subItems,
  parrentId,
  className,
  itemCategory,
}: ISidebarItem) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);

  const handleSidebarItemClick = () => {
    if (parrentId === id) dispatch(setActive(id));
    else {
      dispatch(setSubItemActive({ parrentId, id }));

      dispatch(
        getProductsChunk({
          category: itemCategory || category.ALL,
          cartItems: cart.map((it) => it.productId),
        })
      );
    }
  };

  return (
    <>
      <Link
        to={link}
        onClick={handleSidebarItemClick}
        style={{
          display: parrentId !== id && !sidebarAtive ? "none" : "flex",
        }}
      >
        <IconButton
          className={
            "rounded-lg hover:bg-gray-300" + (active ? " bg-gray-300" : "")
          }
          onClick={() => {}}
        >
          <div
            className={
              "flex items-center justify-start" +
              (sidebarAtive ? " w-[200px] gap-[14px]  px-3" : "") +
              ` ${className}`
            }
          >
            <img
              src={icon.url}
              alt={icon.alt}
              className={
                "filter hover:invert-100" +
                (parrentId !== id ? " w-[20px] h-[20px]" : " ")
              }
              style={{ transition: "filter 0.3s" }}
            />

            {sidebarAtive ? <span>{title}</span> : null}
          </div>
        </IconButton>
      </Link>

      <div className="ml-9 flex flex-col gap-2 ">
        {subItems && active
          ? subItems.map((item) => (
              <SidebarItem
                key={Math.random().toString(6) + id}
                id={item.id}
                sidebarAtive={sidebarAtive}
                title={item.title}
                link={item.link}
                icon={item.icon}
                active={item.active}
                subItems={item.subItems}
                parrentId={id}
                className="w-[150px] px-2 transition-all ease-in-out duration-300 overflow-hidden"
                itemCategory={item.category || category.ALL}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default SidebarItem;
