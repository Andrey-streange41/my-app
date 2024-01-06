import React from "react";
import { IProduct } from "../../types/products";
import AddToCartButton from "./AddToCartButton";
import { useAppDispatch } from "../../hooks/reduxHooks";
import QuantityControl from "./QuantityControl";
import {  deleteFromCart } from "../../redux/slices/cart";


interface ICartProductCard {
  product: IProduct;
}

const CartProductCard = ({ product }: ICartProductCard) => {
  const dispatch = useAppDispatch();
  const addProductToCart = (product: IProduct) => {
    if(product.id)
    dispatch(deleteFromCart(product.id));
  };
  
  return (
    <div className="w-full border min-h-[150px] p-10 justify-between flex items-center flex-wrap">
      <div className="flex gap-6 items-start">
        <img
          className="w-[100px] h-[90px]"
          src={product.image}
          alt="cart-card"
        />
        <div className="flex flex-col gap-3">
          <span className="max-w-[250px]">{product.title}</span>
          <div className="flex gap-3 items-center ">
            <img className="" src="/images/price.svg" alt="price" />
            <span className="font-extrabold text-xl">
              Price: {(product?.price * product.quantity).toFixed(2)}$
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 w-5/12">
        <QuantityControl product={product} />
        <AddToCartButton
          className="border p-3 px-9 w-12/12 min-w-[170px]"
          text={true ? "Delete from cart" : "Add to cart"}
          onClick={() => addProductToCart(product)}
          product={{ ...product }}
          showAlert={false}
        />
      </div>
    </div>
  );
};

export default CartProductCard;
