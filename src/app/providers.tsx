"use client";

import React from "react";
import { SuggestionProvider } from "@/context/SuggestionContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <SuggestionProvider>{children}</SuggestionProvider>;
}