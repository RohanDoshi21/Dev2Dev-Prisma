import { Request, Response, NextFunction } from "express-serve-static-core";
import AnswerService from "../services/answer.service";

const retrieveAnswerForQuestion = async (req: Request, res: Response) => {
  try {
    const answers = await AnswerService.retrieveAnswerForQuestion(
      parseInt(req.params.id)
    );

    res.status(200).json({ data: { answers } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createAnswer = async (req: Request, res: Response) => {
  try {
    const answer = await AnswerService.createAnswer(
      req.body.description,
      req.body.user.id,
      parseInt(req.body.question)
    );

    res.status(200).json({ data: { answer } });
  } catch (error) {
    const errorMessage = (error as Error).name;
      if (errorMessage == "PrismaClientUnknownRequestError") {
        res.status(401).json({ error: 'Cannot add answer to a closed question' });
    }
    res.status(500).json({ error: errorMessage });
  }
};

const updateAnswer = async (req: Request, res: Response) => {
  try {
    const answer = await AnswerService.updateAnswer(
      parseInt(req.params.id),
      req.body
    );

    res.status(200).json({ data: { answer } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const answer = await AnswerService.deleteAnswer(parseInt(req.params.id));

    res.status(200).json({ data: { answer } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  retrieveAnswerForQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};
