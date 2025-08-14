"use client";

import ArrowRightIcon from "@/components/icons/arrow-right";
import Spinner from "@/components/spinner";
import assert from "assert";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { createMessage } from "../../actions";
import { type Chat } from "./page";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useS3Upload } from "next-s3-upload";
import { getUserSettings } from "@/lib/settings";

export default function ChatBox({
  chat,
  onNewStreamPromise,
  isStreaming,
}: {
  chat: Chat;
  onNewStreamPromise: (v: Promise<ReadableStream>) => void;
  isStreaming: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const disabled = isPending || isStreaming;
  const didFocusOnce = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadToS3 } = useS3Upload();
  
  const textareaResizePrompt = prompt
    .split("\n")
    .map((text) => (text === "" ? "a" : text))
    .join("\n");

  useEffect(() => {
    if (!textareaRef.current) return;

    if (!disabled && !didFocusOnce.current) {
      textareaRef.current.focus();
      didFocusOnce.current = true;
    } else {
      didFocusOnce.current = false;
    }
  }, [disabled]);

  useEffect(() => {
    // Clean up preview URL when component unmounts
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!prompt.trim() && !selectedFile) return;

    startTransition(async () => {
      let fileUrl: string | undefined;
      
      if (selectedFile) {
        setIsUploading(true);
        try {
          const { url } = await uploadToS3(selectedFile);
          fileUrl = url;
        } catch (error) {
          console.error('Upload failed:', error);
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      const message = await createMessage(chat.id, prompt, "user", fileUrl);
      
      // Clean up file state
      handleRemoveFile();
      
      // Get user settings for API key and provider
      const userSettings = getUserSettings();
      const apiKey = userSettings.apiKeys[userSettings.provider as keyof typeof userSettings.apiKeys];
      
      const response = await fetch(
        "/api/get-next-completion-stream-promise",
        {
          method: "POST",
          body: JSON.stringify({
            messageId: message.id,
            chatId: chat.id,
            model: userSettings.model || chat.model,
            userPrompt: prompt,
            provider: userSettings.provider,
            apiKey: apiKey
          }),
        }
      );

          // Check if the response indicates an API key error
          if (response.status === 403) {
            const errorData = await response.json();
            if (errorData.error && errorData.error.includes("API key is not configured")) {
              // Show error to user using our existing alert component
              const event = new CustomEvent('showApiKeyAlert', {
                detail: { message: "API key is not configured. Please set up your API key in the settings." }
              });
              window.dispatchEvent(event);
              return;
            }
          }

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      if (!response.body) {
        throw new Error("No body on response");
      }

      const streamPromise = Promise.resolve(response.body);

      onNewStreamPromise(streamPromise);
      startTransition(() => {
        setPrompt("");
      });
    });
  };

  return (
    <div className="mx-auto mb-5 flex w-full max-w-prose shrink-0 px-8">
      <form
        className="relative flex w-full flex-col"
        action={handleSubmit}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewUrl && (
          <div className="mb-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-start gap-3">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{selectedFile?.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile?.size || 0) > 1024 * 1024 
                    ? `${((selectedFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB`
                    : `${((selectedFile?.size || 0) / 1024).toFixed(1)} KB`}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        
        <fieldset className="w-full" disabled={disabled || isUploading}>
          <div className="relative flex rounded-lg border-4 border-gray-300 bg-white">
            <div className="relative w-full">
              <div className="w-full p-2">
                <p className="invisible min-h-[48px] w-full whitespace-pre-wrap">
                  {textareaResizePrompt}
                </p>
              </div>
              <textarea
                ref={textareaRef}
                placeholder={selectedFile ? "Add a caption..." : "Follow up"}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required={!selectedFile}
                name="prompt"
                className="peer absolute inset-0 w-full resize-none bg-transparent p-2 placeholder-gray-500 focus:outline-none disabled:opacity-50"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    const target = event.target;
                    if (!(target instanceof HTMLTextAreaElement)) return;
                    target.closest("form")?.requestSubmit();
                  }
                }}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded peer-focus:outline peer-focus:outline-offset-0 peer-focus:outline-blue-500" />

            <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2 has-[:disabled]:opacity-50">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative inline-flex size-6 items-center justify-center rounded text-gray-500 hover:text-gray-700"
                disabled={disabled || isUploading}
              >
                <Upload className="h-4 w-4" />
              </button>
              
              <div className="pointer-events-none absolute inset-0 -bottom-[1px] rounded bg-blue-700" />

              <button
                className="relative inline-flex size-6 items-center justify-center rounded bg-blue-500 font-medium text-white shadow-lg outline-blue-300 hover:bg-blue-500/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                type="submit"
                disabled={disabled || isUploading}
              >
                <Spinner loading={disabled || isUploading}>
                  <ArrowRightIcon />
                </Spinner>
              </button>
            </div>
          </div>
        </fieldset>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </form>
    </div>
  );
}
