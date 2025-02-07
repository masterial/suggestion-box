import { Suggestion } from "@/types";

export const mockSuggestions: Suggestion[] = [
  {
    id: "sug-1",
    title: "Frontend",
    description: "Create frontend",
    author: "Alice",
    createdAt: new Date("2025-02-01T10:00:00"),
    comments: [
      {
        id: "cmt-1",
        author: "Bob",
        text: "I'm on it.",
        createdAt: new Date("2025-02-01T12:00:00"),
      },
      {
        id: "cmt-2",
        author: "Alice",
        text: "👍🏻",
        createdAt: new Date("2025-02-01T14:30:00"),
      },
    ],
  },
  {
    id: "sug-2",
    title: "Backend",
    description: "Create backend",
    author: "Dave",
    createdAt: new Date("2025-02-02T09:20:00"),
    comments: [
      {
        id: "cmt-3",
        author: "Eve",
        text: "I'm on it.",
        createdAt: new Date("2025-02-02T10:00:00"),
      },
    ],
  },
];