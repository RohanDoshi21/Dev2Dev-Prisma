import { Request, Response } from "express";
import UserServices from "../services/user.service";
import questionService from "../services/question.service";
import httpStatus from "http-status";

const addModerator = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await UserServices.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role == "MODERATOR") {
      throw new Error("User is already a moderator");
    }
    user.role = "MODERATOR";
    const updatedUser = await UserServices.updateUser(user.id, user);
    res.status(httpStatus.OK).send({ data: updatedUser });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.body;
    const { status } = req.body;
    const question = await questionService.getQuestionStatusById(
      parseInt(questionId)
    );
    if (!question) {
      throw new Error("Question not found");
    }
    question.status = status;
    const updatedQuestion = await questionService.updateQuestion(
      parseInt(questionId),
      question
    );
    res.status(httpStatus.OK).send({ data: updatedQuestion });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
  }
};

export default {
  addModerator,
  changeStatus,
};
