import React from "react";

export default function MissingApiAlert({ onSettingsClick }: { onSettingsClick?: () => void }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.68-1.36 3.445 0l6.518 11.59A1.75 1.75 0 0116.518 17H3.482a1.75 1.75 0 01-1.702-2.312L8.257 3.1zM9 7a1 1 0 112 0v3a1 1 0 11-2 0V7zm1 7a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-800">No model provider API key configured</p>
          <p className="mt-1 text-sm text-yellow-700">
            Please set up your API keys in Settings so models can be used.
            {onSettingsClick ? (
              <button
                onClick={onSettingsClick}
                className="ml-3 inline-flex items-center rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 hover:bg-yellow-200"
              >
                Open Settings
              </button>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}