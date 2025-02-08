"use client";

import React from "react";
import { Suggestion } from "@/types";
import { NewCommentForm } from "./NewCommentForm";
import { useSuggestionContext } from "@/context/SuggestionContext";

interface SuggestionDetailProps {
  suggestionId: string | null;
  onClose: () => void;
}

export function SuggestionDetail({ suggestionId, onClose }: SuggestionDetailProps) {
  const { suggestions } = useSuggestionContext();
  const suggestion = suggestions.find((s: Suggestion) => s.id === suggestionId);

  if (!suggestion) return <div>Not found</div>;

  return (
    <div className="flex flex-col h-full">
      {/* Header area */}
      <div className="border-b border-gray-700 pb-2 mb-4">
        <button
          onClick={onClose}
          className="text-sm text-blue-400 hover:text-blue-300 mb-2"
        >
          &larr; Back
        </button>
        <h2 className="text-xl font-semibold">{suggestion.title}</h2>
        <p className="text-sm text-gray-400 italic">
          by {suggestion.author} on {suggestion.createdAt.toLocaleString()}
        </p>
        <p className="mt-2">{suggestion.description}</p>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {suggestion.comments.map((comment) => {
          const isOwner = comment.author === suggestion.author;

          return (
            <div
              key={comment.id}
              className={`flex ${isOwner ? 'justify-end' : ''}`}
            >
              <div className="bg-gray-800 rounded-xl p-3 max-w-[70%]">
                <div className="text-sm font-bold mb-1">{comment.author}</div>
                <div className="text-sm">{comment.text}</div>
                <div className="text-xs text-right text-gray-400 mt-1">
                  {comment.createdAt.toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New comment form */}
      <NewCommentForm suggestionId={suggestion.id} />
    </div>
  );
}