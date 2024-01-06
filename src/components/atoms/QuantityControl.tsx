import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IProduct } from "../../types/products";
import {
  calculateSumma,
  decreeseProductQuantity,
  increeseProductQuantity,
} from "../../redux/slices/cart";

interface IQuantityControl {
  product: IProduct;
}

const QuantityControl = ({ product }: IQuantityControl) => {
  const productInCart = useAppSelector((store) => store.cart.cart).find(
    (it) => it.productId === product?.id
  );
  const { cart } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const increaseQuantity = useCallback(() => {
    dispatch(increeseProductQuantity({ id: product.id }));

    const summa = cart.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);

    if (!isNaN(summa)) {
      dispatch(calculateSumma(summa));
    }
  }, [dispatch, product.id, cart]);

  const decreaseQuantity = () => {
    if (productInCart?.quantity && productInCart?.quantity > 1) {
      dispatch(decreeseProductQuantity({ id: product.id }));
      const summa = cart.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);

      if (!isNaN(summa)) {
        dispatch(calculateSumma(summa));
      }
    }
  };

  return (
    <div className="text-[#3e77aa] flex items-center gap-3">
      <button className="text-2xl" onClick={decreaseQuantity}>
        -
      </button>
      <span className="border rounded-lg px-6 py-3 text-[#000]">
        {productInCart?.quantity}
      </span>
      <button className="text-2xl" onClick={increaseQuantity}>
        +
      </button>
    </div>
  );
};

export default QuantityControl;
