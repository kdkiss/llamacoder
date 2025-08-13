




'use client';

import { useState, useEffect } from 'react';
import { parseTags } from '@/lib/chatUtils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import StarIcon from './icons/star-icon';
import ArchiveIcon from './icons/archive-icon';
import TagIcon from './icons/tag-icon';
import SearchIcon from './icons/search-icon';
import XIcon from './icons/x-icon';
import { useRouter } from 'next/navigation';

interface Chat {
  id: string;
  title: string;
  tags: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ChatSidebarClientProps {
  initialChats: Chat[];
}

export function ChatSidebarClient({ initialChats }: ChatSidebarClientProps) {
  const [chats, setChats] = useState(initialChats);
  const [search, setSearch] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const router = useRouter();

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(search.toLowerCase());
    const matchesFavorite = !showFavorites || chat.isFavorite;
    const matchesArchive = !showArchived || chat.isArchived;
    const chatTags = parseTags(chat.tags);
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => chatTags.includes(tag));

    return matchesSearch && matchesFavorite && matchesArchive && matchesTags;
  });

  const handleFavoriteToggle = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/favorite`, {
        method: 'PUT',
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setChats(chats.map(chat => chat.id === chatId ? updatedChat : chat));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleArchiveToggle = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/archive`, {
        method: 'PUT',
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setChats(chats.map(chat => chat.id === chatId ? updatedChat : chat));
      }
    } catch (error) {
      console.error('Error toggling archive:', error);
    }
  };

  const handleAddTag = async (chatId: string) => {
    if (newTag.trim()) {
      try {
        const response = await fetch(`/api/chats/${chatId}/tags`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tag: newTag.trim() }),
        });

        if (response.ok) {
          const updatedChat = await response.json();
          setChats(chats.map(chat => chat.id === chatId ? updatedChat : chat));
          setNewTag('');
        }
      } catch (error) {
        console.error('Error adding tag:', error);
      }
    }
  };

  const handleRemoveTag = async (chatId: string, tag: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/tags/${encodeURIComponent(tag)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setChats(chats.map(chat => chat.id === chatId ? updatedChat : chat));
      }
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  };

  const allTags = Array.from(new Set(
    chats.flatMap(chat => parseTags(chat.tags))
  )).sort();

  return (
    <div className="w-64 border-r border-gray-200 p-4">
      <div className="mb-4">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <span>Favorites</span>
          <Switch
            checked={showFavorites}
            onCheckedChange={setShowFavorites}
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Archived</span>
          <Switch
            checked={showArchived}
            onCheckedChange={setShowArchived}
          />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2 mb-2">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter(t => t !== tag));
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
            >
              {tag}
              {selectedTags.includes(tag) && (
                <XIcon className="ml-1 h-3 w-3" />
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredChats.map(chat => (
          <div key={chat.id} className="p-2 border rounded hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4
                  className="font-medium truncate cursor-pointer"
                  onClick={() => router.push(`/chats/${chat.id}`)}
                >
                  {chat.title}
                </h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {parseTags(chat.tags).map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-200 px-1.5 py-0.5 rounded flex items-center"
                    >
                      <TagIcon className="w-3 h-3 mr-1" />
                      {tag}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(chat.id, tag);
                        }}
                        className="ml-1 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFavoriteToggle(chat.id)}
                  className={chat.isFavorite ? 'text-yellow-500' : 'text-gray-300'}
                >
                  <StarIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleArchiveToggle(chat.id)}
                  className={chat.isArchived ? 'text-blue-500' : 'text-gray-300'}
                >
                  <ArchiveIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-2">
              <Input
                type="text"
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag(chat.id);
                  }
                }}
                className="text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


