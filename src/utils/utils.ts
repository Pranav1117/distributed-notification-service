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

interface mailOption {
  droppedPricePercentage: number;
  productName: string;
  toEmail: string;
}

export const sendEmail = async ({
  droppedPricePercentage,
  productName,
  toEmail,
}: mailOption) => {
  try {
    const priceDroppedMailOptions = {
      from: "pranavbavaskar1@gmail.com",
      to: toEmail,
      subject: "Price dropped alert",
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Price Dropped</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e0e0e0; padding:20px;">
            <tr>
              <td align="left">
                <h2 style="margin:0 0 10px 0; font-size:24px;">
                  Price Dropped!
                </h2>
                <p style="margin:0 0 10px 0; font-size:16px;">
                  Good news! The price has dropped by 
                  <strong>${droppedPricePercentage}%</strong>
                  for:
                </p>
                <p style="margin:0 0 15px 0; font-size:18px; font-weight:bold;">
                  ${productName}
                </p>
                <p style="margin:0; font-size:14px; color:#555555;">
                  Hurry up and check it out before the offer ends.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    };

    const res = await transport.sendMail(priceDroppedMailOptions);
    console.log("Email sent:", res);
  } catch (error) {
    console.log("Error while sending email:", error);
  }
};

// function to calculate percentage of dropped price
export const calculatePriceDropped = (prevPrice: number, newPrice: number) => {
  if (prevPrice < newPrice) {
    console.log("new price cannot be greater than previous price");
    return null;
  }
  return Math.ceil(((prevPrice - newPrice) / prevPrice) * 100);
};
