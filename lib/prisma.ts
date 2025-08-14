import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import { cache } from "react";

declare global {
  var prisma: PrismaClient | undefined;
}

export const getPrisma = cache(() => {
  if (process.env.NODE_ENV === "production") {
    if (!global.prisma) {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      const adapter = new PrismaNeon(pool);
      global.prisma = new PrismaClient({ adapter });
    }
    return global.prisma;
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
});
