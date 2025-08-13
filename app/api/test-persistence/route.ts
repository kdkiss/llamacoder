import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    
    // Create a test chat with messages
    const testChat = await prisma.chat.create({
      data: {
        title: "Test Chat - Persistence Check",
        prompt: "This is a test chat to verify persistence is working correctly",
        model: "qwen/qwen3-coder:free",
        quality: "low",
        llamaCoderVersion: "v2",
        shadcn: true,
        messages: {
          create: [
            {
              role: "user",
              content: "Hello, this is a test message to verify persistence",
              position: 0
            },
            {
              role: "assistant",
              content: "Hello! I can confirm that persistence is working correctly. This message should be saved to the database.",
              position: 1
            }
          ]
        }
      },
      include: {
        messages: true
      }
    });
    
    return NextResponse.json({
      success: true,
      chat: testChat,
      message: "Test chat created successfully with persistence"
    });
  } catch (error) {
    console.error('Error creating test chat:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create test chat',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();
    
    // Get all chats to verify persistence
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
    
    return NextResponse.json({
      success: true,
      chats,
      count: chats.length,
      message: "Retrieved all chats from database"
    });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch chats',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}