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

const initializeDatabase = async (prisma: PrismaClient) => {
  try {
    // Try to query a table to see if it exists
    await prisma.chat.findFirst();
  } catch (error: any) {
    if (error.code === 'P2021') {
      console.log('Database tables do not exist. Please run: npx prisma db push');
      throw new Error('Database not initialized. Run: npx prisma db push');
    }
    throw error;
  }
};

export const getPrisma = cache(() => {
  let prisma: PrismaClient;
  
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
    prisma = global.prisma;
  } else {
    // In development, create new instance
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: getDatabaseUrl(),
        },
      },
    });
  }
  
  // Initialize database on first use
  initializeDatabase(prisma).catch(console.error);
  
  return prisma;
});
