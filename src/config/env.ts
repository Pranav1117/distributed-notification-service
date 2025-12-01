import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL!,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
};
