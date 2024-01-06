import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import IconButton from "../atoms/IconButton";
import Search from "../molecules/Search";

const Header = () => {
  const { cart } = useAppSelector((store) => store.cart);
  
  return (
    <div
      style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.10))" }}
      className="bg-secondary h-header flex items-center z-10 fixed w-full top-0 left-0 font-inter justify-between p-5"
    >
      <Link to={"/"}>
        <img src="/logo.png" alt="logo" />
      </Link>
      <Search />
      <div className="relative">
        <Link to={"/basket"}>
          <IconButton onClick={() => {}}>
            <img
              src="/images/basket.png"
              className="cursor-pointer"
              alt="basket"
              width={20}
              height={20}
            />
          </IconButton>
        </Link>

        <div className="absolute top-[-40px] right-[-20px] w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center relative text-[10px]">
          {cart.length}
        </div>
      </div>
    </div>
  );
};

export default Header;
