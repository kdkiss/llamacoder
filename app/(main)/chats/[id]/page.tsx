import { getPrisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";
import PageClient from "./page.client";

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ prompt?: string }>;
}) {
  const id = (await params).id;
  const { prompt: urlPrompt } = await searchParams;
  let chat = await getChatById(id);

  // Create a fallback chat if not found
  if (!chat) {
    const displayPrompt = urlPrompt || "Loading your request...";
    chat = {
      id,
      model: "qwen/qwen3-coder:free",
      quality: "low",
      prompt: displayPrompt,
      title: "New Chat",
      llamaCoderVersion: "v2",
      shadcn: true,
      tags: "",
      isFavorite: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [
        {
          id: "fallback-user",
          role: "user",
          content: displayPrompt,
          position: 0,
          chatId: id,
          createdAt: new Date()
        }
      ]
    } as Chat;
  }

  return <PageClient chat={chat!} />;
}

const getChatById = cache(async (id: string) => {
  console.log('Looking for chat ID:', id);
  const prisma = getPrisma();
  const chat = await prisma.chat.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: {
          position: 'asc'
        }
      }
    }
  });
  console.log('Found chat:', chat ? 'YES' : 'NO');
  return chat;
});

export type Chat = NonNullable<Awaited<ReturnType<typeof getChatById>>>;
export type Message = Chat["messages"][number];

export const maxDuration = 45;
