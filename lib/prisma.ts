import { PrismaClient } from "@prisma/client";
import { cache } from "react";

declare global {
  var prisma: PrismaClient | undefined;
}

export const getPrisma = cache(() => {
  if (process.env.NODE_ENV === "production") {
    // In production, use global instance to avoid connection issues
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
  
  // In development, create new instance
  return new PrismaClient();
});
