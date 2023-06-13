import { db } from "../utils/db.server";

const addComponent = async (
  questionId: number,
  componentType: any,
  content: string
) => {
  try {
    const newComponent = await db.questionComponents.create({
      data: {
        question_id: questionId,
        content: content,
        component: componentType,
      },
    });

    return newComponent;
  } catch (error) {
    throw error;
  }
};

export default {
  addComponent,
};
