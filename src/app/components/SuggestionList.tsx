"use client";

import React from "react";
import { useSuggestionContext } from "@/context/SuggestionContext";
import { SuggestionItem } from "./SuggestionItem";

interface SuggestionListProps {
  onSelect: (suggestionId: string | null) => void;
}

export function SuggestionList({ onSelect }: SuggestionListProps) {
  const { suggestions } = useSuggestionContext();

  return (
    <div className="space-y-2">
      {suggestions.map((suggestion) => (
        <SuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          onClick={() => onSelect(suggestion.id)}
        />
      ))}
    </div>
  );
}