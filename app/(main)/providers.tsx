"use client";

import { createContext, ReactNode, useState } from "react";
import { ThemeProvider } from "@/app/providers/theme-provider";

export const Context = createContext<{
  streamPromise?: Promise<ReadableStream>;
  setStreamPromise: (v: Promise<ReadableStream> | undefined) => void;
}>({
  setStreamPromise: () => {},
});

export default function Providers({ children }: { children: ReactNode }) {
  const [streamPromise, setStreamPromise] = useState<Promise<ReadableStream>>();

  return (
    <ThemeProvider>
      <Context.Provider value={{ streamPromise, setStreamPromise }}>{children}</Context.Provider>
    </ThemeProvider>
  );
}
