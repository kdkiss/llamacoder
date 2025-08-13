import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model, quality } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const prisma = getPrisma();

    // Create a test chat directly using Prisma
    const chat = await prisma.chat.create({
      data: {
        title: prompt.substring(0, 50) + "...",
        model: model || "moonshotai/kimi-k2:free",
        quality: quality || "high",
        prompt: prompt || "Test chat for persistence",
        llamaCoderVersion: "v2",
        shadcn: true,
      },
    });

    // Create initial system message
    const systemMessage = await prisma.message.create({
      data: {
        role: "system",
        content: "Test system message for persistence testing",
        position: 0,
        chatId: chat.id,
      },
    });

    return NextResponse.json({
      success: true,
      chat,
      systemMessage,
      message: "Test chat created successfully",
    });
  } catch (error) {
    console.error("Error creating test chat:", error);
    return NextResponse.json(
      { error: "Failed to create test chat", details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Test chat endpoint is working. Use POST to create a test chat.",
  });
}