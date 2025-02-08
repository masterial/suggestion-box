"use client";

import React from "react";
import { Suggestion } from "@/types";

interface SuggestionItemProps {
  suggestion: Suggestion;
  onClick: () => void;
}

export function SuggestionItem({ suggestion, onClick }: SuggestionItemProps) {
  return (
    <div
      onClick={onClick}
      className="
        bg-gray-800 
        border 
        border-gray-700 
        rounded-md 
        p-3 
        cursor-pointer 
        hover:bg-gray-700 
        transition-colors
      "
    >
      <h4 className="text-sm font-semibold">{suggestion.title}</h4>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(suggestion.createdAt).toLocaleDateString()} @
        {new Date(suggestion.createdAt).toLocaleTimeString()}
      </p>
      <p className="text-xs text-gray-400 italic">{suggestion.author}</p>
    </div>
  );
}