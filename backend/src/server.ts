import express from "express";
import cors from "cors";
import suggestionsRouter from "./routes/suggestions";

const app = express();
app.use(cors()); 
app.use(express.json()); 

app.use("/api/suggestions", suggestionsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});