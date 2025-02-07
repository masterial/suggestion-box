"use client";

import React, { useState } from "react";
import { useSuggestionContext } from "@/context/SuggestionContext";

export function NewSuggestionForm() {
  const { addSuggestion } = useSuggestionContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !author) return;
    addSuggestion(title, description, author);
    setTitle("");
    setDescription("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input
          type="text"
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <input
          type="text"
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Your Name</label>
        <input
          type="text"
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-4 rounded-md"
      >
        Add Suggestion
      </button>
    </form>
  );
}