import { db } from "../utils/db.server";

const retrieveQuestions = async (page: number, sortType: string) => {
  try {
    const offset = 10;
    var orderBy = {};

    if (sortType === "most_recent") {
      orderBy = {
        created_at: "desc",
      };
    } else if (sortType === "oldest") {
      orderBy = {
        created_at: "asc",
      };
    } else if (sortType === "most_upvoted") {
      orderBy = {
        upvotes: "desc",
      };
    } else if (sortType === "most_answered") {
      orderBy = {
        answers: {
          _count: "desc",
        },
      };
    }

    const questions = await db.question.findMany({
      skip: (page - 1) * offset,
      take: offset,
      orderBy: orderBy,
      include: {
        owner: {
          select: {
            email: true,
          },
        },
      },
    });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveMyQuestions = async (
  ownerId: number,
  page: number,
  sortType: string
) => {
  try {
    const offset = 10;
    var orderBy = {};

    if (sortType === "most_recent") {
      orderBy = {
        created_at: "desc",
      };
    } else if (sortType === "oldest") {
      orderBy = {
        created_at: "asc",
      };
    } else if (sortType === "most_upvoted") {
      orderBy = {
        upvotes: "desc",
      };
    } else if (sortType === "most_answered") {
      orderBy = {
        answers: {
          _count: "desc",
        },
      };
    }

    const questions = await db.question.findMany({
      where: {
        ownerId: ownerId,
      },
      skip: (page - 1) * offset,
      take: offset,
      orderBy: orderBy,
      include: {
        owner: {
          select: {
            email: true,
          },
        },
      },
    });

    return questions;
  } catch (error) {
    throw error;
  }
};

const retrieveQuestionById = async (quesetionId: number) => {
  const question = await db.question.findUnique({
    where: {
      id: quesetionId,
    },
    include: {
      owner: {
        select: {
          email: true,
        },
      },
    },
  });

  return question;
};

const createQuestion = async (
  title: string,
  description: string,
  ownerId: number,
  tag: string[]
) => {
  try {
    const newQuestion = await db.question.create({
      data: {
        title: title,
        description: description,
        ownerId: ownerId,
        tag: tag,
      },
    });

    return newQuestion;
  } catch (error) {
    throw error;
  }
};

const updateQuestion = async (questionId: number, question: any) => {
  try {
    const updatedQuestion = await db.question.update({
      where: {
        id: questionId,
      },
      data: {
        title: question.title,
        description: question.description,
      },
    });

    return updatedQuestion;
  } catch (error) {
    throw error;
  }
};

const deleteQuestion = async (questionId: number) => {
  try {
    const deletedQuestion = await db.question.delete({
      where: {
        id: questionId,
      },
    });

    return deletedQuestion;
  } catch (error) {
    throw error;
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
