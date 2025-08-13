"use client";

import { useState, useEffect } from "react";
import { SUGGESTED_PROMPTS } from "@/lib/constants";
import RefreshIcon from "@/components/icons/refresh";

interface DynamicPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export default function DynamicPrompts({ onPromptSelect }: DynamicPromptsProps) {
  const [currentPrompts, setCurrentPrompts] = useState<Array<{title: string, description: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
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
          <button
            key={`${prompt.title}-${Math.random()}`}
            type="button"
            onClick={() => onPromptSelect(prompt.description)}
            className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {prompt.title}
          </button>
        ))}
      </div>
    </div>
  );
}