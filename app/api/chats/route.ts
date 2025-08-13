
import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const { title, prompt } = await request.json();

    // Create a simple chat
    const chat = await prisma.chat.create({
      data: {
        title: title || "New Chat",
        prompt: prompt || "",
        model: "gpt-4", // default model
        quality: "high", // default quality
        llamaCoderVersion: "v2",
        shadcn: true,
      },
    });

    return NextResponse.json({ chat });
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Failed to create chat' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const search = searchParams.get('search') || '';
    const tags = searchParams.get('tags') || '';
    const favorites = searchParams.get('favorites') === 'true';
    const archived = searchParams.get('archived') === 'true';
    const sort = searchParams.get('sort') || 'recent';

    // Build the where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { prompt: { contains: search } },
      ];
    }

    if (tags) {
      const tagArray = tags.split(',').filter(Boolean);
      where.tags = {
        contains: tagArray.join(','),
      };
    }

    if (favorites) {
      where.isFavorite = true;
    }

    if (archived) {
      where.isArchived = true;
    } else {
      where.isArchived = false;
    }

    // Build the orderBy clause
    const orderBy: any = {};
    if (sort === 'recent') {
      orderBy.createdAt = 'desc';
    } else if (sort === 'updated') {
      orderBy.updatedAt = 'desc';
    } else if (sort === 'title') {
      orderBy.title = 'asc';
    }

    const chats = await prisma.chat.findMany({
      where,
      orderBy,
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

