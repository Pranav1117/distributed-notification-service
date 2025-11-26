// src/db/dbClient.ts
import { PrismaClient } from "@prisma/client";
// import * as logger from "@/config/logger";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient = global.prisma || new PrismaClient();

if (!global.prisma) {
  global.prisma = prismaClient;
}

export const prisma = prismaClient;

// logger.logger.info("Prisma client initialized.");
