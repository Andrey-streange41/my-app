import { useCallback, useState } from "react";
import { IProduct } from "../../types/products";
import { addToCart, deleteFromCart } from "../../redux/slices/cart";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

interface IButton {
  text: string;
  className?: string;
  product?: IProduct;
  onClick: () => void;
  showAlert?: boolean;
}
const AddToCartButton = ({
  text,
  className,
  onClick,
  product,
  showAlert = true,
}: IButton) => {
  const [showMessage, setShowMessage] = useState(false);
  const cartProductsId = useAppSelector((store) => store.cart.cart).map(
    (it) => it.productId
  );

  const handleAddToCart = useCallback(() => {
    if (showAlert) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    }

    onClick();
  }, [showAlert, onClick]);

  return (
    <button
      disabled={showMessage}
      onClick={handleAddToCart}
      className={className + " w-[80%] hover:text-gray-700"}
    >
      {!showMessage ? text : null}
      {showMessage && (
        <div className="flex items-center justify-center gap-[10px]">
          <p>
            {product?.id && !cartProductsId.includes(product?.id)
              ? "Deleted!"
              : "Added!"}
          </p>
          <img width={25} height={25} src="/images/saved.webp" alt="saved" />
        </div>
      )}
    </button>
  );
};

export default AddToCartButton;
