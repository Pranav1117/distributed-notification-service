import { Request, Response } from "express";
import { prisma } from "../../db/dbClient";

const sampleProducts = [
  {
    sku: "P1001",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    priceCents: 1499,
  },
  {
    sku: "P1002",
    name: "Mechanical Keyboard",
    description: "RGB backlit keyboard",
    priceCents: 5499,
  },
  {
    sku: "P1003",
    name: "USB-C Charger",
    description: "Fast 65W charger",
    priceCents: 2999,
  },
];

export const send_notification_controller = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
};

export const post_product_data = async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await prisma.product.createMany({
    data: sampleProducts,
  });
  console.log(result);
  return res.json(result);
};

export const update_product_price = async (req: Request, res: Response) => {
  const { id, price } = req.body;

  console.log(id, price);
    const result = await prisma.product.update({
      data: { priceCents: price },
      where: { id },
    });

   

    console.log(result);
    return res.json(result);
};
