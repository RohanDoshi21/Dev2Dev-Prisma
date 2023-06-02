import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import questionRouter from "./routes/question.route";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/questions", questionRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});
