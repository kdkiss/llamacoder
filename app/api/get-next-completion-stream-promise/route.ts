import { getPrisma } from "@/lib/prisma";
import { getUserSettings, getApiConfig } from "@/lib/settings";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { messageId, model, chatId, userPrompt, provider, apiKey } = await req.json();

  // Skip message lookup and get all messages for the chat
  const prisma = getPrisma();
  const messagesRes = await prisma.message.findMany({
    where: { chatId },
    orderBy: { position: 'asc' }
  });
  let messages: { role: string; content: string }[] = messagesRes.slice(-10).map(m => ({
    role: m.role,
    content: m.content
  }));
  
  console.log('Found messages for chat:', messages.length);
  console.log('User prompt received:', userPrompt);
  
  // Fallback if no messages found - use the actual user prompt
  if (messages.length === 0) {
    messages = [
      { role: "system", content: "You are a helpful coding assistant. Generate complete, working code based on the user's request." },
      { role: "user", content: userPrompt || "Create a simple web application." }
    ];
  }

  // Use provided settings or fall back to OpenRouter
  const baseUrl = provider === "openai" ? "https://api.openai.com/v1" :
                  provider === "anthropic" ? "https://api.anthropic.com" :
                  provider === "mistral" ? "https://api.mistral.ai/v1" :
                  "https://openrouter.ai/api/v1";
  
  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENROUTER_API_KEY,
    baseURL: baseUrl,
  });

  try {
    console.log('Making API call with model:', model);
    console.log('Base URL:', baseUrl);
    console.log('Messages count:', messages.length);
    
    const res = await openai.chat.completions.create({
      model,
      messages: messages.map((m) => ({ 
        role: m.role as "system" | "user" | "assistant", 
        content: m.content 
      })),
      stream: true,
      temperature: 0.2,
      max_tokens: 9000,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of res) {
            const chunkData = `data: ${JSON.stringify(chunk)}\n\n`;
            controller.enqueue(encoder.encode(chunkData));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const runtime = "nodejs";
export const maxDuration = 45;
