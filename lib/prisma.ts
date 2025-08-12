import { PrismaClient } from "@prisma/client";
import { cache } from "react";

declare global {
  var prisma: PrismaClient | undefined;
}

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    // Use /tmp for Vercel's writable directory in serverless environment
    return process.env.DATABASE_URL || "file:/tmp/dev.db";
  }
  return process.env.DATABASE_URL || "file:./dev.db";
};

export const getPrisma = cache(() => {
  if (process.env.NODE_ENV === "production") {
    // In production, use global instance to avoid connection issues
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        datasources: {
          db: {
            url: getDatabaseUrl(),
          },
        },
      });
    }
    return global.prisma;
  }
  
  // In development, create new instance
  return new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });
});
