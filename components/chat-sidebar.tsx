



'use client';

import { useState, useEffect } from 'react';
import { parseTags } from '@/lib/chatUtils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { StarIcon, ArchiveIcon, TagIcon, SearchIcon, XIcon } from './icons';

interface Chat {
  id: string;
  title: string;
  tags: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ChatSidebarProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  onFavoriteToggle: (chatId: string) => void;
  onArchiveToggle: (chatId: string) => void;
  onAddTag: (chatId: string, tag: string) => void;
  onRemoveTag: (chatId: string, tag: string) => void;
}

export function ChatSidebar({
  chats,
  onSelectChat,
  onFavoriteToggle,
  onArchiveToggle,
  onAddTag,
  onRemoveTag
}: ChatSidebarProps) {
  const [search, setSearch] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(search.toLowerCase());
    const matchesFavorite = !showFavorites || chat.isFavorite;
    const matchesArchive = !showArchived || chat.isArchived;
    const chatTags = parseTags(chat.tags);
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => chatTags.includes(tag));

    return matchesSearch && matchesFavorite && matchesArchive && matchesTags;
  });

  const handleAddTag = (chatId: string) => {
    if (newTag.trim()) {
      onAddTag(chatId, newTag.trim());
      setNewTag('');
    }
  };

  const handleRemoveTag = (chatId: string, tag: string) => {
    onRemoveTag(chatId, tag);
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
                <h4 className="font-medium truncate" onClick={() => onSelectChat(chat.id)}>
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
                  onClick={() => onFavoriteToggle(chat.id)}
                  className={chat.isFavorite ? 'text-yellow-500' : 'text-gray-300'}
                >
                  <StarIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onArchiveToggle(chat.id)}
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

function SearchIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
      <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21" />
    </svg>
  );
}

function ArchiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6v6H9z" />
    </svg>
  );
}

function TagIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 21h10l10-19H12zM12 6l7 13H5z" />
    </svg>
  );
}



