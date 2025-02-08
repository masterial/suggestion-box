"use client";

import React, { useEffect, useState } from "react";
import { useSuggestionContext } from "@/context/SuggestionContext";

export function RandomSuggestionSpawner() {
  const [isActive, setIsActive] = useState(false);
  const { generateRandom } = useSuggestionContext();

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      generateRandom();
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive, generateRandom]);

  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        <span className="text-sm text-gray-300">Enable Random Suggestions</span>
      </label>
    </div>
  );
}