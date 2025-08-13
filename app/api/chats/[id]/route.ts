

import { getPrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const action = searchParams.get('action');

  const params = await context.params;

  if (action === 'favorite') {
    return handleFavoriteToggle(request, params);
  } else if (action === 'archive') {
    return handleArchiveToggle(request, params);
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const action = searchParams.get('action');

  const params = await context.params;

  if (action === 'tags') {
    return handleAddTag(request, params);
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const action = searchParams.get('action');
  const tag = searchParams.get('tag');

  const params = await context.params;

  if (action === 'tags' && tag) {
    return handleRemoveTag(request, { ...params, tag });
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
}

async function handleFavoriteToggle(request: NextRequest, params: { id: string }) {
  try {
    const prisma = getPrisma();
    const chatId = params.id;

    // Get the current chat to fetch existing data
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    // Toggle the favorite status
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        isFavorite: !chat.isFavorite,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Failed to toggle favorite' },
      { status: 500 }
    );
  }
}

async function handleArchiveToggle(request: NextRequest, params: { id: string }) {
  try {
    const prisma = getPrisma();
    const chatId = params.id;

    // Get the current chat to fetch existing data
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    // Toggle the archive status
    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        isArchived: !chat.isArchived,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error toggling archive:', error);
    return NextResponse.json(
      { error: 'Failed to toggle archive' },
      { status: 500 }
    );
  }
}

async function handleAddTag(request: NextRequest, params: { id: string }) {
  try {
    const prisma = getPrisma();
    const chatId = params.id;
    const { tag } = await request.json();

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag is required' },
        { status: 400 }
      );
    }

    // Get the current chat to fetch existing tags
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    // Add the new tag
    const existingTags = chat.tags ? chat.tags.split(',') : [];
    if (!existingTags.includes(tag)) {
      existingTags.push(tag);
    }

    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        tags: existingTags.join(','),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error adding tag:', error);
    return NextResponse.json(
      { error: 'Failed to add tag' },
      { status: 500 }
    );
  }
}

async function handleRemoveTag(request: NextRequest, params: { id: string, tag: string }) {
  try {
    const prisma = getPrisma();
    const chatId = params.id;
    const tagToRemove = params.tag;

    if (!tagToRemove) {
      return NextResponse.json(
        { error: 'Tag is required' },
        { status: 400 }
      );
    }

    // Get the current chat to fetch existing tags
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    // Remove the tag
    const existingTags = chat.tags ? chat.tags.split(',') : [];
    const updatedTags = existingTags.filter(tag => tag !== tagToRemove);

    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        tags: updatedTags.join(','),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.error('Error removing tag:', error);
    return NextResponse.json(
      { error: 'Failed to remove tag' },
      { status: 500 }
    );
  }
}

