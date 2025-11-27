import express from "express";
import {
  get_product_data,
  post_product_data,
  send_notification_controller,
  update_product_price,
} from "../controllers/notification_controllers";

const router = express.Router();

router.use("/notify", send_notification_controller);
router.use("/post_product_data", post_product_data);
router.use("/update_product_price", update_product_price);
router.use("/get_product_data", get_product_data);

export default router;
