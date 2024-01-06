import { IOrderForm } from "../types/orderForm";

export const validateForm = (
  orderForm: IOrderForm,
  setUsernameError: (error: string) => void,
  setEmailError: (error: string) => void,
  setTelError: (error: string) => void
) => {
  if (!orderForm.username) {
    setUsernameError("Required field !");
    return false;
  }
  setUsernameError("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(orderForm.email)) {
    setEmailError("Invalid email format");
    return false;
  }
  setEmailError("");

  const telRegex = /^\+380\d{9}$/;
  if (!telRegex.test(orderForm.tel)) {
    setTelError("Invalid phone number format");
    return false;
  }
  setTelError("");

  return true;
};
