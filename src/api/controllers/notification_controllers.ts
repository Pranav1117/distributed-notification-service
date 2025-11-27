import { Request, Response } from "express";
import { prisma } from "../../db/dbClient";
import { Queue } from "bullmq";

const sampleProducts = [
  {
    sku: "P1004",
    name: "Bluetooth Headphones",
    description: "Over-ear wireless headphones with noise isolation",
    priceCents: 7999,
  },
  {
    sku: "P1005",
    name: "Smart Watch",
    description: "Fitness tracking smart watch",
    priceCents: 12999,
  },
  {
    sku: "P1006",
    name: "Laptop Stand",
    description: "Aluminum adjustable laptop stand",
    priceCents: 3499,
  },
  {
    sku: "P1007",
    name: "Webcam 1080p",
    description: "Full HD USB webcam",
    priceCents: 4599,
  },
  {
    sku: "P1008",
    name: "External SSD 1TB",
    description: "High-speed portable SSD storage",
    priceCents: 10999,
  },
  {
    sku: "P1009",
    name: "Gaming Mouse Pad",
    description: "Large anti-slip gaming mouse pad",
    priceCents: 1499,
  },
  {
    sku: "P1010",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with charging case",
    priceCents: 6999,
  },
  {
    sku: "P1011",
    name: "HDMI Cable 2m",
    description: "High-speed HDMI cable 2 meters",
    priceCents: 999,
  },
  {
    sku: "P1012",
    name: "USB Hub",
    description: "7-in-1 USB-C hub adapter",
    priceCents: 3999,
  },
  {
    sku: "P1013",
    name: "Desk Lamp",
    description: "LED desk lamp with brightness control",
    priceCents: 2999,
  },

  {
    sku: "P1014",
    name: "Portable Power Bank",
    description: "20000mAh fast-charging power bank",
    priceCents: 4999,
  },
  {
    sku: "P1015",
    name: "Wireless Charger",
    description: "15W fast wireless charging pad",
    priceCents: 2599,
  },
  {
    sku: "P1016",
    name: "Mechanical Number Pad",
    description: "RGB mechanical external numpad",
    priceCents: 4299,
  },
  {
    sku: "P1017",
    name: "Laptop Backpack",
    description: "Water-resistant laptop backpack",
    priceCents: 5899,
  },
  {
    sku: "P1018",
    name: "Smart LED Bulb",
    description: "WiFi color-changing LED bulb",
    priceCents: 1899,
  },
  {
    sku: "P1019",
    name: "Ethernet Cable 5m",
    description: "Cat6 high-speed network cable",
    priceCents: 1299,
  },
  {
    sku: "P1020",
    name: "Noise Cancelling Headset",
    description: "Active noise cancelling headset",
    priceCents: 14999,
  },
  {
    sku: "P1021",
    name: "Mini Bluetooth Speaker",
    description: "Portable waterproof speaker",
    priceCents: 3799,
  },
  {
    sku: "P1022",
    name: "Graphics Tablet",
    description: "Drawing tablet for digital artists",
    priceCents: 8999,
  },
  {
    sku: "P1023",
    name: "Monitor Arm",
    description: "Adjustable single monitor arm",
    priceCents: 6499,
  },

  {
    sku: "P1024",
    name: "Smart Plug",
    description: "Remote-controlled WiFi smart plug",
    priceCents: 1599,
  },
  {
    sku: "P1025",
    name: "Ring Light",
    description: "LED ring light for video recording",
    priceCents: 4799,
  },
  {
    sku: "P1026",
    name: "Thermal Printer",
    description: "Bluetooth receipt thermal printer",
    priceCents: 13999,
  },
  {
    sku: "P1027",
    name: "VR Headset",
    description: "Mobile compatible virtual reality headset",
    priceCents: 8999,
  },
  {
    sku: "P1028",
    name: "Desk Organizer",
    description: "Multi-compartment desk organizer",
    priceCents: 2199,
  },
  {
    sku: "P1029",
    name: "Wireless Presentation Remote",
    description: "USB presentation clicker",
    priceCents: 2799,
  },
  {
    sku: "P1030",
    name: "Hard Drive Enclosure",
    description: "USB-C 2.5 inch HDD enclosure",
    priceCents: 3299,
  },
  {
    sku: "P1031",
    name: "Security Camera",
    description: "Indoor WiFi security camera",
    priceCents: 8999,
  },
  {
    sku: "P1032",
    name: "CPU Cooling Fan",
    description: "High-performance PC cooling fan",
    priceCents: 2499,
  },
  {
    sku: "P1033",
    name: "Keyboard Wrist Rest",
    description: "Memory foam keyboard wrist rest",
    priceCents: 1999,
  },

  {
    sku: "P1034",
    name: "Smart Thermostat",
    description: "App-controlled smart thermostat",
    priceCents: 17999,
  },
  {
    sku: "P1035",
    name: "Cable Management Box",
    description: "Heat-resistant cable organizer box",
    priceCents: 2199,
  },
  {
    sku: "P1036",
    name: "Portable Monitor",
    description: "15.6 inch portable USB-C monitor",
    priceCents: 15999,
  },
  {
    sku: "P1037",
    name: "Wireless Game Controller",
    description: "Bluetooth game controller",
    priceCents: 5999,
  },
  {
    sku: "P1038",
    name: "USB Desk Fan",
    description: "Quiet USB powered cooling fan",
    priceCents: 1799,
  },
  {
    sku: "P1039",
    name: "Digital Alarm Clock",
    description: "LED digital alarm clock with temperature",
    priceCents: 2299,
  },
  {
    sku: "P1040",
    name: "Smart Door Sensor",
    description: "Wireless door and window sensor",
    priceCents: 1499,
  },
  {
    sku: "P1041",
    name: "Microphone Condenser",
    description: "Studio quality condenser microphone",
    priceCents: 7999,
  },
  {
    sku: "P1042",
    name: "Adjustable Standing Desk",
    description: "Motorized height-adjustable desk",
    priceCents: 29999,
  },
  {
    sku: "P1043",
    name: "Laptop Privacy Filter",
    description: "Anti-glare privacy screen protector",
    priceCents: 3499,
  },
];

export const send_notification_controller = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
};

export const post_product_data = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const result = await prisma.product.createMany({
      data: sampleProducts,
      skipDuplicates: true,
    });
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.error("Error in post_product_data:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  }
};

export const get_product_data = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const result = await prisma.product.findMany();
    console.log(result.length)  ;
    return res.json(result);
  } catch (error) {
    console.log("Error in post_product_data:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  }
};

export const update_product_price = async (req: Request, res: Response) => {
  const { id, price } = req.body;

  console.log(id, price);
  const result = await prisma.product.update({
    data: { priceCents: price },
    where: { id },
  });

  const producer = new Queue("email_notification");

  await producer.add("email_customer", {
    message: "price of product dropped by 70%",
  });

  console.log(result);
  return res.json(result);
};
