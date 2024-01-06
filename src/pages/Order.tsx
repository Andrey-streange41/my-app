import { useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { SimpleRegistrationForm } from "../components/organisms/OrderForm";
import Alert from "../components/molecules/modals/Alert";

const Order = () => {
  const { cart, totalSumma } = useAppSelector((store) => store.cart);
  const [showAlert, setShowAlert] = useState(false);

  const showAlertAction = () => {
    setShowAlert(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Placing an order</h1>
      <h2 className="text-lg font-normal">Your contact details</h2>
      <div className="flex w-full border flex-wrap">
        <div className="flex flex-col gap-3 w-6/12">
          <SimpleRegistrationForm showAlertAction={showAlertAction} />
        </div>
        <div className="w-4/12 min-w-[360px] border min-h-[300px] bg-gray-300 rounded-lg font-bold text-2xl p-6 flex-col flex gap-6">
          <span>Total: </span>
          <p className="text-sm text-gray-600 font-normal w-full flex items-center justify-between">
            <span>
              {cart.reduce((accum, current) => accum + current.quantity, 0)}{" "}
              items worth{" "}
            </span>
            <span>{totalSumma.toFixed(2)} $</span>
          </p>
          <p className="text-sm text-gray-600 font-normal w-full flex items-center justify-between">
            7 products worth Receiving an order from 5,000 $ - 30,000 $ with
            documents. When paying in cash over ₴30,000, you must provide
            documents for verification in accordance with the requirements of
            the Law of Ukraine dated December 6, 2019 No. 361-IX
          </p>
        </div>
      </div>
      <Alert
        visible={showAlert}
        setVisible={setShowAlert}
        message={
          "Your order has been placed. Please wait for a call from our manager."
        }
      />
    </div>
  );
};

export default Order;
