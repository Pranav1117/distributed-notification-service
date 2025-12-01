import { sendEmail } from "@/utils/utils";
import { Worker } from "bullmq";
import IORedis from "ioredis";

// Redis connection
const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "notification",
  async (job) => {
    console.log(job.name);
    console.log(job.id);
    console.log(job.data);
    await sendEmail();
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});
