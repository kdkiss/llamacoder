// Simple in-memory database for development
interface Message {
  id: string;
  role: string;
  content: string;
  chatId: string;
  position: number;
  createdAt: Date;
}

interface Chat {
  id: string;
  model: string;
  quality: string;
  prompt: string;
  title: string;
  llamaCoderVersion: string;
  shadcn: boolean;
  messages: Message[];
  createdAt: Date;
}

// Use globalThis to ensure persistence across all contexts
if (!globalThis.appDatabase) {
  globalThis.appDatabase = {
    chats: new Map<string, Chat>(),
    messages: new Map<string, Message>()
  };
}

// Ensure appDatabase is always defined
globalThis.appDatabase = globalThis.appDatabase || {
  chats: new Map<string, Chat>(),
  messages: new Map<string, Message>()
};

class MemoryDB {
  private get db() {
    return globalThis.appDatabase!;
  }

  generateId(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async createChat(data: Omit<Chat, 'id' | 'createdAt' | 'messages'>) {
    const id = this.generateId();
    const chat: Chat = {
      ...data,
      id,
      createdAt: new Date(),
      messages: []
    };
    this.db.chats.set(id, chat);
    return chat;
  }

  async findChatById(id: string) {
    console.log('All chat IDs:', Array.from(this.db.chats.keys()));
    const chat = this.db.chats.get(id);
    if (!chat) return null;
    
    const chatMessages = Array.from(this.db.messages.values())
      .filter(m => m.chatId === id)
      .sort((a, b) => a.position - b.position);
    
    return { ...chat, messages: chatMessages };
  }

  async updateChat(id: string, data: Partial<Chat>) {
    const chat = this.db.chats.get(id);
    if (!chat) return null;
    
    const updated = { ...chat, ...data };
    this.db.chats.set(id, updated);
    return updated;
  }

  async createMessage(data: Omit<Message, 'id' | 'createdAt'>) {
    const id = this.generateId();
    const message: Message = {
      ...data,
      id,
      createdAt: new Date()
    };
    this.db.messages.set(id, message);
    console.log('Stored message with ID:', id, 'Total messages:', this.db.messages.size);
    return message;
  }

  async findMessageById(id: string) {
    console.log('Looking for message ID:', id, 'Total messages:', this.db.messages.size);
    return this.db.messages.get(id) || null;
  }

  async findMessagesByChat(chatId: string, maxPosition?: number) {
    return Array.from(this.db.messages.values())
      .filter(m => m.chatId === chatId && (maxPosition === undefined || m.position <= maxPosition))
      .sort((a, b) => a.position - b.position);
  }
}

export const memoryDB = new MemoryDB();