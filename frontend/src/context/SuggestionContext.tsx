"use client";

import React, { createContext, useContext, useState } from "react";
import { mockSuggestions } from "@/data/mockData";
import { generateRandomSuggestion } from "@/utils/randomGenerator";
import { Suggestion } from "@/types";

interface SuggestionContextValue {
  suggestions: Suggestion[];
  addSuggestion: (title: string, description: string, author: string) => void;
  addComment: (suggestionId: string, author: string, text: string) => void;
  generateRandom: () => void;
}

const SuggestionContext = createContext<SuggestionContextValue | undefined>(
  undefined
);

export const SuggestionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);

  const addSuggestion = (title: string, description: string, author: string) => {
    const newSuggestion: Suggestion = {
      id: `sug-${Date.now()}`,
      title,
      description,
      author,
      createdAt: new Date(),
      comments: [],
    };
    setSuggestions((prev) => [newSuggestion, ...prev]);
  };

  const addComment = (suggestionId: string | null, author: string, text: string) => {
    setSuggestions((prev) =>
      prev.map((sug) =>
        sug.id === suggestionId
          ? {
              ...sug,
              comments: [
                ...sug.comments,
                {
                  id: `cmt-${Date.now()}`,
                  author,
                  text,
                  createdAt: new Date(),
                },
              ],
            }
          : sug
      )
    );
  };

  const generateRandom = () => {
    const randomSuggestion = generateRandomSuggestion();
    setSuggestions((prev) => [randomSuggestion, ...prev]);
  };

  return (
    <SuggestionContext.Provider
      value={{ suggestions, addSuggestion, addComment, generateRandom }}
    >
      {children}
    </SuggestionContext.Provider>
  );
};

export const useSuggestionContext = (): SuggestionContextValue => {
  const context = useContext(SuggestionContext);
  if (!context) {
    throw new Error(
      "useSuggestionContext must be used within a SuggestionProvider"
    );
  }
  return context;
};