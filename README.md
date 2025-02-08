# Suggestion Box

This is a **full‐stack** TypeScript project for a “Suggestion Box” application. It includes:

1. A **Node + Express + SQLite** backend for storing suggestions and comments.  
2. A **React/Next.js** frontend that displays suggestions, allows new submissions, and supports adding comments.

## Features

- **Database**: SQLite with basic tables (`suggestions`, `comments`).  
- **REST API**:
  - `GET /api/suggestions`
  - `POST /api/suggestions`
  - `GET /api/suggestions/:id`
  - `POST /api/suggestions/:id/comments`
- **Frontend**:
  - Displays a list of suggestions
  - Form for creating new suggestions
  - Comment threads for discussion
- **Random Suggestions**: Optional button/toggler to auto-generate random suggestions.

## Quick Start

### 1. Clone the Repo
```bash
git clone https://github.com/masterial/suggestion-box.git
cd suggestion-box
```

### 2. Install Dependencies
**Backend**:
```bash
cd backend
npm install
```

**Frontend**:
```bash
cd ../frontend
npm install
```

### 3. Run the Backend
```bash
cd ../backend
npm run dev
```
•	The server starts on http://localhost:4000.

### 4. Run the Frontend
```bash
cd ../frontend
npm run dev
```
•	Open http://localhost:3000 in your browser.