// config for env i.e. service.config.portimport dotenv from 'dotenv';

import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL!,
};
