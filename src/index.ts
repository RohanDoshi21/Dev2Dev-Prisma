import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import questionRouter from "./routes/question.route";
import answerRouter from "./routes/answer.route";
import tagRouter from "./routes/tag.route";
import voteRouter from "./routes/vote.route";
import searchRouter from "./routes/search.route";
import moderationRouter from "./routes/moderation.route";
import userRouter from "./routes/user.route";

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
app.use("/answers", answerRouter);
app.use("/tags", tagRouter);
app.use("/votes", voteRouter);
app.use("/search", searchRouter);
app.use("/moderation", moderationRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});
