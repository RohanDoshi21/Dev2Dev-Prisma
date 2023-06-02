import express from "express";
import auth from "../middlewares/auth";
import VoteController from "../controllers/vote.controller";

const router = express.Router();

router.put(
  "/question/:questionId",
  auth.verifyUser,
  VoteController.voteQuestion
);

router.put("/answer/:answerId", auth.verifyUser, VoteController.voteAnswer);

export default router;
