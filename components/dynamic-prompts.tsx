"use client";

import { useState, useEffect } from "react";
import { SUGGESTED_PROMPTS } from "@/lib/constants";
import RefreshIcon from "@/components/icons/refresh";
import CopyIcon from "@/components/icons/copy";
import PromptPreviewModal from "@/components/prompt-preview-modal";

interface DynamicPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export default function DynamicPrompts({ onPromptSelect }: DynamicPromptsProps) {
  const [currentPrompts, setCurrentPrompts] = useState<Array<{
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    difficulty?: string;
    type?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<{
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    difficulty?: string;
    type?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize with random prompts
  useEffect(() => {
    generateNewPrompts();
  }, []);

  const generateNewPrompts = () => {
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const shuffled = [...SUGGESTED_PROMPTS].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 4);
      setCurrentPrompts(selected);
      setIsLoading(false);
    }, 300);
  };

  const copyToClipboard = async (text: string, promptTitle: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptTitle);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedPrompt(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePromptClick = (prompt: {
    title: string;
    description: string;
    category?: string;
    tags?: string[];
    difficulty?: string;
    type?: string;
  }) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleModalUsePrompt = (prompt: string) => {
    onPromptSelect(prompt);
    setIsModalOpen(false);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'Web App': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'Mobile App': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'API': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'Desktop': return 'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Try these examples
          </h3>
          <button
            type="button"
            onClick={generateNewPrompts}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            aria-label="Refresh prompts"
          >
            <RefreshIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {currentPrompts.map((prompt) => (
            <div key={`${prompt.title}-${Math.random()}`} className="relative group">
              <button
                type="button"
                onClick={() => handlePromptClick(prompt)}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {prompt.title}
              </button>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(prompt.description, prompt.title);
                }}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full p-1 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                title="Copy to clipboard"
                aria-label={`Copy ${prompt.title} to clipboard`}
              >
                <CopyIcon className={`h-3 w-3 ${copiedPrompt === prompt.title ? 'text-green-500' : 'text-gray-400'}`} />
              </button>
              
              {copiedPrompt === prompt.title && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <PromptPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prompt={selectedPrompt}
        onUsePrompt={handleModalUsePrompt}
      />
    </>
  );
}