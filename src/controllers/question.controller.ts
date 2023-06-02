import { Request, Response, NextFunction } from "express-serve-static-core";
import QuestionService from "../services/question.service";

const retrieveQuestions = async (req: Request, res: Response) => {
  try {
    const page =
      req.query.page !== undefined ? parseInt(req.query.page.toString()) : 0;
    const sortType =
      req.query.sort !== undefined ? req.query.sort.toString() : "most_recent";

    const questions = await QuestionService.retrieveQuestions(page, sortType);

    console.log(page, sortType);

    res.status(200).json({ data: { questions } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const retrieveMyQuestions = async (req: Request, res: Response) => {
  try {
    const page =
      req.query.page !== undefined ? parseInt(req.query.page.toString()) : 0;
    const sortType =
      req.query.sort !== undefined ? req.query.sort.toString() : "most_recent";

    const questions = await QuestionService.retrieveMyQuestions(
      req.body.user.id,
      page,
      sortType
    );

    res.status(200).json({ data: { questions } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const retrieveQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await QuestionService.retrieveQuestionById(
      parseInt(req.params.id)
    );

    res.status(200).json({ data: { question } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await QuestionService.createQuestion(
      req.body.title,
      req.body.description,
      req.body.user.id,
      req.body.tag
    );

    res.status(200).json({ data: { question } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await QuestionService.updateQuestion(
      parseInt(req.params.id),
      req.body
    );

    res.status(200).json({ data: { question } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteQuestion = async (req: Request, res: Response) => {
  try {
    await QuestionService.deleteQuestion(parseInt(req.params.id));

    return res.json({ data: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  retrieveQuestions,
  retrieveMyQuestions,
  retrieveQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
