export interface Comment {
    id: number;
    suggestionId: number;
    author: string;
    text: string;
    createdAt: string;
  }
  
  export interface Suggestion {
    id: number;
    title: string;
    description: string;
    author: string;
    createdAt: string;
  }