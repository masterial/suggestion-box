export interface Comment {
    id: string;
    author: string;
    text: string;
    createdAt: Date;
  }
  
  export interface Suggestion {
    id: string;
    title: string;
    description: string;
    author: string;
    createdAt: Date;
    comments: Comment[];
  }