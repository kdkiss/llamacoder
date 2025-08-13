import { PrismaClient } from "@prisma/client";
import { cache } from "react";

declare global {
  var prisma: PrismaClient | undefined;
}

export const getPrisma = cache(() => {
  const isDev = process.env.NODE_ENV === "development";
  const isLocalSQLite = process.env.DATABASE_URL?.startsWith("file:");
  
  if (process.env.NODE_ENV === "production") {
    // In production, use global instance to avoid connection issues
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
  
  // In development with SQLite, use the dev schema
  if (isDev && isLocalSQLite) {
    return new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  }
  
  // Default case
  return new PrismaClient();
});
