"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Suggestion } from "@/types";
import { NewCommentForm } from "./NewCommentForm";

interface SuggestionDetailProps {
  suggestionId: string | null;
  onClose: () => void;
}

export function SuggestionDetail({ suggestionId, onClose }: SuggestionDetailProps) {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const fetchSuggestion = useCallback(async () => {
    const res = await fetch(`http://localhost:4000/api/suggestions/${suggestionId}`);
    const data = await res.json();
    setSuggestion(data);
  }, [suggestionId]);

  useEffect(() => {
    fetchSuggestion();
  }, [fetchSuggestion]);

  if (!suggestion) return <div>Loading...</div>;

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
          by {suggestion.author} on {new Date(suggestion.createdAt).toLocaleString()}
        </p>
        <p className="mt-2">{suggestion.description}</p>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {suggestion.comments.length === 0 ? (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          suggestion.comments.map((comment) => {
            const isOwner = comment.author === suggestion.author;
            return (
              <div
                key={comment.id}
                className={`flex ${isOwner ? "justify-end" : ""}`}
              >
                <div className="bg-gray-800 rounded-xl p-3 max-w-[70%]">
                  <div className="text-sm font-bold mb-1">{comment.author}</div>
                  <div className="text-sm">{comment.text}</div>
                  <div className="text-xs text-right text-gray-400 mt-1">
                    {new Date(comment.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New comment form */}
      <NewCommentForm suggestionId={suggestion.id} onCommentAdded={fetchSuggestion} />
    </div>
  );
}