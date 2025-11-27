import { Request, Response } from "express";
import { prisma } from "../../db/dbClient";
import { Queue } from "bullmq";

const producer = new Queue("notification");

export const send_notification_controller = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
};

// export const post_product_data = async (req: Request, res: Response) => {
//   try {
//     const result = await prisma.product.createMany({
//       data: sampleProducts,
//       skipDuplicates: true,
//     });

//     return res.json(result);
//   } catch (error) {
//     console.error("Error in post_product_data:", error);
//     return res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error });
//   }
// };

export const get_product_data = async (req: Request, res: Response) => {
  try {
    const result = await prisma.product.findMany();
    return res.json(result);
  } catch (error) {
    console.log("Error in post_product_data:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  }
};

export const update_product_price = async (req: Request, res: Response) => {
  try {
    const { id, price } = req.body;

    const product = await prisma.product.findFirst({
      where: { id },
    });

    console.log("product", product);
    if (!product)
      return res
        .status(404)
        .json({ message: "No product available with this id" });

    const existingPrice = product.priceCents;

    if (price < existingPrice) {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { priceCents: price },
      });

      if (!updatedProduct)
        return res.status(500).json({ message: "Failed to update price" });

      // add producer here
      await producer.add("email_notification", {
        data: { messsage: `price droped from ${existingPrice} to ${price}` },
      });

      return res.status(200).json({ message: "Price updated successfully" });
    }
    return res.status(200).json({ message: "same price" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error while updating product price", error?.message);
      return res.status(500).json({ message: error?.message });
    }
    return res.status(500).json({ message: "Unknown server error" });
  }
};
