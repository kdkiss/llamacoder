"use server";

import { getPrisma } from "@/lib/prisma";
import {
  getMainCodingPrompt,
  screenshotToCodePrompt,
  softwareArchitectPrompt,
} from "@/lib/prompts";
import { notFound } from "next/navigation";
import OpenAI from "openai";

export async function createChat(
  prompt: string,
  model: string,
  quality: "high" | "low",
  screenshotUrl: string | undefined,
  apiKey?: string,
  provider?: string,
) {
  const prisma = getPrisma();
  let chat;
  try {
    console.log('Attempting to create chat with model:', model);
    chat = await prisma.chat.create({
      data: {
        model,
        quality,
        prompt,
        title: "",
        llamaCoderVersion: "v2",
        shadcn: true,
      },
    });
    console.log('Chat created successfully:', chat.id);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Add Helicone headers if HELICONE_API_KEY is present
  const defaultHeaders = process.env.HELICONE_API_KEY ? {
    "HTTP-Referer": "https://llamacoder.io",
    "X-Title": "LlamaCoder",
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
    "Helicone-Property-appname": "LlamaCoder",
    "Helicone-Session-Id": chat.id,
    "Helicone-Session-Name": "LlamaCoder Chat",
  } : {};

  // Use provided API key and provider, fallback to environment variables
  let finalApiKey = apiKey;
  const finalProvider = provider || "openrouter";
  
  // Fallback to environment variables if no user API key provided
  if (!finalApiKey) {
    switch (finalProvider) {
      case "openai":
        finalApiKey = process.env.OPENAI_API_KEY;
        break;
      case "anthropic":
        finalApiKey = process.env.ANTHROPIC_API_KEY;
        break;
      case "mistral":
        finalApiKey = process.env.MISTRAL_API_KEY;
        break;
      default:
        finalApiKey = process.env.OPENROUTER_API_KEY;
    }
  }
  
  const baseUrl = finalProvider === "openai" ? "https://api.openai.com/v1" :
                  finalProvider === "anthropic" ? "https://api.anthropic.com" :
                  finalProvider === "mistral" ? "https://api.mistral.ai/v1" :
                  "https://openrouter.ai/api/v1";

  if (!finalApiKey) {
    throw new Error(`API key is required for ${finalProvider}. Please configure your API key in settings or set the ${finalProvider.toUpperCase()}_API_KEY environment variable.`);
  }

  const openai = new OpenAI({
    apiKey: finalApiKey,
    baseURL: baseUrl,
    defaultHeaders,
  });

  // Generate simple title from prompt (no API call)
  const title = prompt.slice(0, 50).replace(/[^a-zA-Z0-9\s]/g, '').trim() || "New App";
  const mostSimilarExample = "none"; // Skip example matching to avoid API calls
  
  console.log('Using generated title:', title);

  // Use prompt directly, handle screenshot in the main API call later
  let userMessage = prompt;
  // if (screenshotUrl) {
  //   userMessage = prompt + " (Screenshot provided for reference)";
  // }

  await prisma.message.create({
    data: {
      role: "system",
      content: getMainCodingPrompt(mostSimilarExample),
      position: 0,
      chatId: chat.id,
    },
  });
  
  const lastMessage = await prisma.message.create({
    data: {
      role: "user",
      content: userMessage,
      position: 1,
      chatId: chat.id,
    },
  });
  
  console.log('Created message with ID:', lastMessage.id);
  
  const newChat = await prisma.chat.update({
    where: { id: chat.id },
    data: { title },
  });

  if (!lastMessage) throw new Error("No new message");

  return {
    chatId: chat.id,
    lastMessageId: lastMessage.id,
  };
}

export async function createMessage(
  chatId: string,
  text: string,
  role: "assistant" | "user",
  fileUrl?: string,
) {
  const prisma = getPrisma();
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });
  if (!chat) notFound();

  const maxPosition = Math.max(...chat.messages.map((m: { position: number }) => m.position), -1);

  const newMessage = await prisma.message.create({
    data: {
      role,
      content: text,
      fileUrl,
      position: maxPosition + 1,
      chatId,
    },
  });

  return newMessage;
}
