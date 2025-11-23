import express from "express";
import router from "./api/routes/notification_routes";
import { config } from "./config/env";

const app = express();

// will not read body if we dont use this middleware
app.use(express.json());

app.use("/api/v1/", router);

const PORT = process.env.PORT;
app.listen(config.port, () => {
  console.log(`Server running on ${PORT || 3001}`);
});
