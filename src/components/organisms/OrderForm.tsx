import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { IOrderForm } from "../../types/orderForm";
import { validateForm } from "../../utils/validationForm";
import { useAppSelector } from "../../hooks/reduxHooks";
import { sendEmail } from "../../api/email/emailService";

export function SimpleRegistrationForm({
  showAlertAction,
}: {
  showAlertAction: () => void;
}) {
  const { cart } = useAppSelector((store) => store.cart);
  const { products } = useAppSelector((store) => store.products);
  const [orderForm, setOrderForm] = useState<IOrderForm>({
    username: "",
    tel: "",
    email: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const valid = validateForm(
      orderForm,
      setUsernameError,
      setEmailError,
      setTelError
    );

    if (!valid) return;

    const orderedProducts = products.filter((product) =>
      cart.map((it) => it.productId).includes(product.id)
    );

    const addQuantity = orderedProducts.map((product) => {
      const quantity = cart.find((it) => it.productId === product.id)?.quantity;
      return { ...product, quantity };
    });

    // notify Manager
    await sendEmail({
      name: orderForm.username,
      email: orderForm.email,
      message: "A new order has arrived. Contact customer for details.",
    });
    showAlertAction();
    console.log({ order: { user: orderForm, products: addQuantity } });
  };

  return (
    <Card placeholder={""} color="transparent" shadow={false}>
      <div className="mt-8 mb-2 max-w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            placeholder={""}
            variant="h6"
            color="blue-gray"
            className="-mb-3"
          >
            Your Name
          </Typography>
          <div className="flex flex-col gap-1 ">
            <Input
              min={3}
              max={20}
              error={!!usernameError}
              required
              name="username"
              value={orderForm.username}
              onChange={(e) => {
                setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
              }}
              crossOrigin=''
              size="lg"
              placeholder="name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <p className="text-red-300 text-sm">{usernameError}</p>
          </div>

          <Typography
            placeholder={""}
            variant="h6"
            color="blue-gray"
            className="-mb-3"
          >
            Your Email
          </Typography>
          <div className="flex flex-col gap-1 ">
            <Input
              required
              onChange={(e) => {
                setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
              }}
              error={!!emailError}
              name="email"
              value={orderForm.email}
              crossOrigin=''
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <p className="text-red-300 text-sm">{emailError}</p>
          </div>
          <Typography
            placeholder={""}
            variant="h6"
            color="blue-gray"
            className="-mb-3"
          >
            Mobile number
          </Typography>
          <div className="flex flex-col gap-1 ">
            <Input
              required
              min={13}
              onChange={(e) => {
                setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
              }}
              value={orderForm.tel}
              error={!!telError}
              name="tel"
              maxLength={13}
              crossOrigin=''
              type="tel"
              size="lg"
              placeholder="+38 066 999 79 24"
              className="  "
              label="phone-number"
            />
            <p className="text-red-300 text-sm">{telError}</p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          placeholder={""}
          className="mt-6"
          fullWidth
        >
          Submit an order
        </Button>
      </div>
    </Card>
  );
}
