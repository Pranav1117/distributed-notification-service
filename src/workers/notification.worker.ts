import { Worker } from "bullmq";

const worker = new Worker("email_notification", async (job) => {
  console.log(job);
});
