"use client";

import React, { useState } from "react";
import { NewSuggestionForm } from "./components/NewSuggestionForm";
import { RandomSuggestionSpawner } from "./components/RandomSuggestionSpawner";
import { SuggestionList } from "./components/SuggestionList";
import { SuggestionDetail } from "./components/SuggestionDetail";

export default function HomePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main className="flex flex-1">
      {/* Left column */}
      <div className="w-80 flex-shrink-0 border-r border-gray-700 overflow-y-auto p-4">
        <h1 className="text-lg font-bold mb-4">Suggestions</h1>
        <NewSuggestionForm />
        <RandomSuggestionSpawner />
        <SuggestionList onSelect={(id) => setSelectedId(id)} />
      </div>

      {/* Right column */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        {selectedId ? (
          <SuggestionDetail
            suggestionId={selectedId}
            onClose={() => setSelectedId(null)}
          />
        ) : (
          <div className="text-gray-400 flex items-center justify-center h-full">
            Select a suggestion to view details
          </div>
        )}
      </div>
    </main>
  );
}