"use server";

export async function deleteChat(chatId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/chats/${chatId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete chat');
  }
  
  return response.json();
}

export async function deleteAllChats() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/chats`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete all chats');
  }
  
  return response.json();
}