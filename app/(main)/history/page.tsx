import { getPrisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ChatHistoryPage() {
  const prisma = getPrisma();
  const chats = await prisma.chat.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Format date function
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chat History</h1>
          <p className="mt-2 text-gray-600">
            View and manage your previous conversations
          </p>
        </div>

        {chats.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <h3 className="text-lg font-medium text-gray-900">No chat history yet</h3>
            <p className="mt-1 text-gray-500">
              Start a new conversation to see it appear here
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Start New Chat
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chats/${chat.id}`}
                className="block rounded-lg bg-white p-6 shadow hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{chat.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(chat.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                      {chat.model}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {chat.prompt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}