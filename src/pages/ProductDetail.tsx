import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import AddToCartButton from "../components/atoms/AddToCartButton";
import { IProduct } from "../types/products";
import { addToCart, deleteFromCart } from "../redux/slices/cart";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((store) => store.products);
  const { cart } = useAppSelector((store) => store.cart);
  const [current, setCurrent] = useState<IProduct>();

  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    setButtonText(
      current?.id && cart.map((it) => it.productId).includes(current?.id)
        ? "Delete from cart"
        : "Add to cart"
    );
  }, [current, cart]);

  const addProductToCart = (product: IProduct | null) => {
    if (product?.id && cart.map((it) => it.productId).includes(product?.id)) {
      dispatch(deleteFromCart(product?.id));
    } else {
      dispatch(
        addToCart({
          productId: product?.id,
          quantity: 1,
          price: product?.price,
        })
      );
    }
  };

  useEffect(() => {
    setCurrent(products?.find((it) => +it.id === Number(id)));
  }, [products, id]);

  return (
    <div className="w-full min-h-[495px] bg-secondary flex items-center p-20 justify-between relative">
      <img className="w-[262px] h-[369px]" src={current?.image} alt="pict" />

      <div className="border flex flex-col gap-3  w-6/12 p-3 ">
        <span className="font-medium text-xl mb-3"> {current?.title}</span>
        <div className="flex gap-3 items-center">
          <span>
            <span className="font-bold ">Category: </span> {current?.category}
          </span>
        </div>
        <div className="flex gap-3 items-center absolute bottom-3 right-6">
          <img src="/images/price.svg" alt="price" />
          <span className="font-extrabold text-xl">
            Price: {current?.price}$
          </span>
        </div>
        <h2 className="font-extrabold">Description:</h2>
        <p>{current?.description}</p>
        <h2>
          <span className="font-extrabold">Rating: </span>
          {current?.rating.rate}
        </h2>
        <AddToCartButton
          className="  border p-3 px-9  w-full"
          text={buttonText}
          onClick={() => addProductToCart(current || null)}
          product={current || undefined}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
