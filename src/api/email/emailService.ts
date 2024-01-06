import emailjs from "@emailjs/browser";
import { SERVICE_KEY_EMAILER, TEMPLATE_KEY_EMAILER } from "../../utils/const";

export const sendEmail = async ({
  email,
  message,
  name,
}: {
  email: string;
  message: string;
  name: string;
}) => {
  const templateParams = {
    to_name: name,
    recipient: email,
    from_name: "Best products",
    subject: "React submit FORM",
    message: message,
  };

  try {
    await emailjs.send(
      SERVICE_KEY_EMAILER,
      TEMPLATE_KEY_EMAILER,
      templateParams
    );

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
