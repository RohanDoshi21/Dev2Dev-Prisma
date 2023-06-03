import { Request, Response } from "express";
import { db } from "../utils/db.server";

const search = async (req: Request, res: Response) => {
  try {
    // Get the query
    var query = req.params.key;

    query = query!.toString();

    // Search for the questions
    var questions: any = [];

    var x = await db.question.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { tag: { hasSome: query } },
        ],
      },
    });

    // Add the questions to the array
    for (var i = 0; i < x.length; i++) {
      questions.push(x[i]);
    }

    var y = await db.answer.findMany({
      where: {
        description: {
          search: query,
        },
      },
      include: {
        question: true,
      },
    });

    // Add the questions to the array
    for (var i = 0; i < y.length; i++) {
      questions.push(y[i].question);
    }

    res.status(200).json({ data: { questions } });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  search,
};
