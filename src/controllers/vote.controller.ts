import { Request, Response, NextFunction } from "express-serve-static-core";
import VoteService from "../services/vote.service";

const voteQuestion = async (req: Request, res: Response) => {
  try {
    await VoteService.voteQuestion(
      parseInt(req.params.questionId),
      req.body.vote,
      req.body.user.id
    );

    res.status(200).json({ data: { message: "Vote Successful" } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const voteAnswer = async (req: Request, res: Response) => {
  try {
    await VoteService.voteAnswer(
      parseInt(req.params.answerId),
      req.body.vote,
      req.body.user.id
    );

    res.status(200).json({ data: { message: "Vote Successful" } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  voteQuestion,
  voteAnswer,
};
