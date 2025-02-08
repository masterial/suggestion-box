"use client";

import { useEffect } from "react";
import { useSuggestionContext } from "@/context/SuggestionContext";

export function RandomSuggestionSpawner() {
  const { generateRandom } = useSuggestionContext();

  useEffect(() => {
    const interval = setInterval(() => {
      generateRandom();
    }, 5000);

    return () => clearInterval(interval);
  }, [generateRandom]);

  return null;
}