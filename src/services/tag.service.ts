import { db } from "../utils/db.server";

const getTagList = async () => {
  try {
    const uniqueTags = await db.question.findMany({
      select: {
        tag: true,
      },
    });

    const allTags = uniqueTags.flatMap((question) => question.tag);

    // Remove duplicate tags
    const uniqueTagList = [...new Set(allTags)];

    return uniqueTagList;
  } catch (error) {
    throw error;
  }
};
const getQuestionsByTag = async (tag: string) => {
  try {
    const questions = await db.question.findMany({
      where: {
        tag: {
          has: tag,
        },
      },
    });

    return questions;
  } catch (error) {
    throw error;
  }
};

export default {
  getTagList,
  getQuestionsByTag,
};
