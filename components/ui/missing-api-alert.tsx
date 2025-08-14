"use client";

import React, { useEffect, useState } from "react";
import { isApiKeyConfigured } from "@/lib/settings";

export default function MissingApiAlert({ onSettingsClick }: { onSettingsClick?: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if API key is configured on initial load
    setIsVisible(!isApiKeyConfigured());

    // Listen for API key error events
    const handleApiKeyAlert = (event: CustomEvent) => {
      setErrorMessage(event.detail.message);
      setIsVisible(true);
    };

    window.addEventListener('showApiKeyAlert', handleApiKeyAlert as EventListener);

    return () => {
      window.removeEventListener('showApiKeyAlert', handleApiKeyAlert as EventListener);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-lg border border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-800 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.68-1.36 3.445 0l6.518 11.59A1.75 1.75 0 0116.518 17H3.482a1.75 1.75 0 01-1.702-2.312L8.257 3.1zM9 7a1 1 0 112 0v3a1 1 0 11-2 0V7zm1 7a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-medium">API Key Required</p>
          <p className="mt-1">
            {errorMessage || "You need to configure an API key in the settings to use this application."}
          </p>
          <div className="mt-3">
            {onSettingsClick ? (
              <button
                onClick={onSettingsClick}
                className="inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-1.5 text-xs font-medium text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Go to Settings
              </button>
            ) : (
              <a
                href="/settings"
                className="inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-1.5 text-xs font-medium text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Go to Settings
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}