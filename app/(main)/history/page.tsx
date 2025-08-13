



import { getPrisma } from "@/lib/prisma";
import { ChatSidebarClient } from "@/components/chat-sidebar-client";
import { parseTags } from "@/lib/chatUtils";

export const dynamic = 'force-dynamic';

export default async function ChatHistoryPage() {
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

  // Transform chats to include parsed tags
  const transformedChats = chats.map(chat => ({
    ...chat,
    tags: parseTags(chat.tags),
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
  }));

  return (
    <div className="flex h-screen">
      <ChatSidebarClient initialChats={transformedChats} />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Chat History</h1>
        <p>Select a chat from the sidebar to view details.</p>
      </div>
    </div>
  );
}



