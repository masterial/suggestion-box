"use client"; 

import React, { createContext, useContext, useEffect, useState } from "react";
import { generateRandomSuggestion } from "@/utils/randomGenerator"; 
import { Suggestion, Comment } from "@/types";

interface SuggestionContextValue {
  suggestions: Suggestion[];
  addSuggestion: (title: string, description: string, author: string) => Promise<void>;
  addComment: (suggestionId: string, author: string, text: string) => Promise<void>;
  generateRandom: () => Promise<void>;
}

const SuggestionContext = createContext<SuggestionContextValue | undefined>(undefined);

export const SuggestionProvider = ({ children }: { children: React.ReactNode }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    (async function loadSuggestions() {
      try {
        const res = await fetch("http://localhost:4000/api/suggestions");
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    })();
  }, []);

  const addSuggestion = async (title: string, description: string, author: string) => {
    try {
      const res = await fetch("http://localhost:4000/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, author }),
      });
      if (!res.ok) throw new Error("Error creating suggestion");
      const newSuggestion: Suggestion = await res.json();

      setSuggestions((prev) => [newSuggestion, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async (suggestionId: string, author: string, text: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/suggestions/${suggestionId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, text }),
      });
      if (!res.ok) throw new Error("Error creating comment");
      const newComment: Comment = await res.json();

      setSuggestions((prev) =>
        prev.map((sug) =>
          sug.id === suggestionId
            ? {
                ...sug,
                comments: sug.comments ? [...sug.comments, newComment] : [newComment],
              }
            : sug
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const generateRandom = async () => {
    const randomLocal = generateRandomSuggestion();
    try {
      await addSuggestion(randomLocal.title, randomLocal.description, randomLocal.author);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SuggestionContext.Provider
      value={{ suggestions, addSuggestion, addComment, generateRandom }}
    >
      {children}
    </SuggestionContext.Provider>
  );
};

export function useSuggestionContext() {
  const ctx = useContext(SuggestionContext);
  if (!ctx) {
    throw new Error("useSuggestionContext must be used within a SuggestionProvider");
  }
  return ctx;
}