import { useEffect } from "react";
import CartProductCard from "../components/atoms/CartProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Button } from "@material-tailwind/react";
import { calculateSumma } from "../redux/slices/cart";
import { Link } from "react-router-dom";
import { getProductsChunk } from "../redux/slices/products";
import { category } from "../types/products";

const ProductCart = () => {
  const { products } = useAppSelector((store) => store.products);
  const { totalSumma, cart } = useAppSelector((store) => store.cart);
  const cartProuctsId = useAppSelector((store) => store.cart.cart).map(
    (it) => it.productId
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const summa = cart.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);

    if (!isNaN(summa)) {
      dispatch(calculateSumma(summa));
    }
  }, [dispatch, products, cart]);

  useEffect(() => {
    dispatch(
      getProductsChunk({
        category: category.ALL,
        cartItems: cart.map((it) => it.productId),
      })
    );
    //eslint-disable-next-line
  }, [dispatch]);

  const handleComplateOrder = () => {};

  if (!products.filter((it) => cartProuctsId.includes(it.id)).length) {
    return (
      <div className="w-full min-h-[400px] max-h-[600px] bg-secondary flex p-3 flex-col items-center gap-9">
        <h1 className="w-full text-center text-xl font-bold">Product Cart</h1>
        <img
          className="w-5/12 h-[300px]"
          src="/images/basket-empty.jpg"
          alt=""
        />
        <strong>Empty</strong>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-secondary flex p-3 flex-col items-center gap-9">
      <h1 className="w-full text-center text-xl font-bold">Product Cart</h1>
      <ul className="flex gap-9 flex-col w-full h-[70%] overflow-y-auto">
        {products
          .filter((it) => cartProuctsId.includes(it.id))
          .map((it, i) => (
            <CartProductCard
              key={it.id + i}
              product={{
                ...it,
                quantity:
                  cart.find(({ productId }) => productId === it.id)?.quantity ||
                  0,
              }}
            />
          ))}
      </ul>
      <div className="w-7/12 flex justify-center border p-10 items-center gap-6 rounded-md flex flex-wrap min-w-[350px]">
        <span className="font-bold text-2xl">{totalSumma.toFixed(2)}$</span>
        <Link to={"/order"}>
          <Button
            className="min-w-[170px] h-[50px]"
            placeholder={""}
            variant="outlined"
            onClick={handleComplateOrder}
          >
            Complete your order
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCart;
