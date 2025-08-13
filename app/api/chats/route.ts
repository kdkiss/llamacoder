import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const chats = await prisma.chat.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        messages: {
          orderBy: {
            position: 'asc'
          }
        }
      }
    });
    
    return NextResponse.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
}