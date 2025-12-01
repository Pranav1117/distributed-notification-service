import nodemailer from "nodemailer";
import { config } from "@/config/env";

const transport = nodemailer.createTransport({
  host: config.mailHost,
  port: 587,
  secure: false,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
  },
});

const mailOptions = {
  //tood
  from: "pranavbavaskar1@gmail.com",
  to: "pranavbavaskar2@gmail.com",
  subject: "price dropped alert",
  html: "<p>price dropped</p>",
};

export const sendEmail = async () => {
  try {
    const res = await transport.sendMail(mailOptions);
    console.log("res", res);
  } catch (error) {
    console.log("error", error);
  }
};
