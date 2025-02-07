"use client";

import React, { useState } from "react";
import { useSuggestionContext } from "@/context/SuggestionContext";

interface NewCommentFormProps {
  suggestionId: string;
}

export function NewCommentForm({ suggestionId }: NewCommentFormProps) {
  const { addComment } = useSuggestionContext();
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;
    addComment(suggestionId, author, text);
    setAuthor("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Your name"
        className="
          bg-gray-800 
          border 
          border-gray-700 
          rounded-md 
          p-2 
          text-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-600
        "
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add to the discussion..."
        className="
          flex-1
          bg-gray-800 
          border 
          border-gray-700 
          rounded-md 
          p-2 
          text-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-600
        "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="
          bg-blue-600 
          hover:bg-blue-700 
          transition-colors 
          text-white 
          font-semibold 
          py-2 
          px-4 
          rounded-md
        "
      >
        Send
      </button>
    </form>
  );
}