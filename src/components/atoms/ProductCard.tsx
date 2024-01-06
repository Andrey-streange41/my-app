import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IProduct } from "../../types/products";
import AddToCartButton from "./AddToCartButton";
import { addToCart, deleteFromCart } from "../../redux/slices/cart";

interface ICard {
  card: IProduct;
}

const ProductCard = ({ card }: ICard) => {
  const dispatch = useAppDispatch();
  const productInCart = useAppSelector((store) => store.cart.cart).map(
    (it) => it.productId
  );
  
  const addProductToCart = (product: IProduct) => {
    if (product?.id && productInCart.includes(product?.id)) {
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

  return (
    <div className="w-card h-card bg-secondary flex justify-start gap-[10px] items-center flex-col rounded-br-lg rounded-bl-lg font-[500] text-lg relative">
      <div className="bg-brand w-full h-[50px] flex items-center justify-center">
        <div className="flex items-center justify-center gap-[10px] ">
          <img src="/images/price.svg" alt="price" />
          <span className="text-[#fff]">{card.price}$</span>
        </div>
      </div>
      <div className="text-[#524F5E] text-sm capitalize">{card.category}</div>
      <div className="flex justify-start gap-[30px] items-center flex-col p-[20px]">
        <Link to={"/products/" + card.id}>
          <img
            className="w-[130px] h-[170px] cursor-pointer"
            src={card.image}
            alt="cardPicture"
          />
        </Link>
        <Link to={"/products/" + card.id}>
          <h5 className="text-center max-h-[110px] overflow-y-auto cursor-pointer">
            {card.title}
          </h5>
        </Link>
        <AddToCartButton
          className="absolute bottom-[10px] border p-3 px-9"
          text={
            productInCart.includes(card.id) ? "Delete from cart" : "Add to cart"
          }
          onClick={() => addProductToCart(card)}
          product={card}
        />
      </div>
    </div>
  );
};

export default ProductCard;
