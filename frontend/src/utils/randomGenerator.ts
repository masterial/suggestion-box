"use client";

import { Suggestion } from "@/types";

const titles = ["1️⃣", "2️⃣", "3️⃣"];
const descriptions = ["🟢", "🟠", "🔴"];
const authors = ["Alice", "Bob", "Carol"];

export function generateRandomSuggestion(): Suggestion {
  const title = titles[Math.floor(Math.random() * titles.length)];
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const author = authors[Math.floor(Math.random() * authors.length)];

  return {
    id: `sug-${Date.now()}`,
    title,
    description,
    author,
    createdAt: new Date(),
    comments: [],
  };
}