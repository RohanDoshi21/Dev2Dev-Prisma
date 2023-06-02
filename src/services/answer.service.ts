import { db } from "../utils/db.server";

const retrieveAnswerForQuestion = async (questionId: number) => {
  try {
    const answers = await db.answer.findMany({
      where: {
        question_id: questionId,
      },
      include: {
        owner: {
          select: {
            email: true,
          },
        },
      },
    });

    return answers;
  } catch (error) {
    throw error;
  }
};

const createAnswer = async (
  description: string,
  ownerId: number,
  questionId: number
) => {
  try {
    const newAnswer = await db.answer.create({
      data: {
        description: description,
        ownerId: ownerId,
        question_id: questionId,
      },
    });

    return newAnswer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateAnswer = async (answerId: number, answer: any) => {
  try {
    const updatedAnswer = await db.answer.update({
      where: {
        id: answerId,
      },
      data: {
        description: answer.description,
      },
    });

    return updatedAnswer;
  } catch (error) {
    throw error;
  }
};

const deleteAnswer = async (answerId: number) => {
  try {
    const deletedAnswer = await db.answer.delete({
      where: {
        id: answerId,
      },
    });

    return deletedAnswer;
  } catch (error) {
    throw error;
  }
};

export default {
  retrieveAnswerForQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};
