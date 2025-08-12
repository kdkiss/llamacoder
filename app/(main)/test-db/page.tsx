import { getPrisma } from "@/lib/prisma";

export default async function TestDBPage() {
  const prisma = getPrisma();
  
  try {
    const chats = await prisma.chat.findMany();
    return (
      <div>
        <h1>Database Test</h1>
        <p>Successfully connected to database</p>
        <p>Found {chats.length} chats</p>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>{chat.title} - {chat.id}</li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Database Test</h1>
        <p>Error connecting to database: {(error as Error).message}</p>
      </div>
    );
  }
}