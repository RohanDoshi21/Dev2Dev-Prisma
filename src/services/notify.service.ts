import { db } from "../utils/db.server";
import email from "../utils/mail";

const sendEmailToOwner = async (answer: string, question_id: number) => {
  try {
    const question = await db.question.findUnique({
      where: {
        id: question_id,
      },
      include: {
        owner: {
          select: {
            email: true,
          },
        },
      },
    });

    const title = question?.title!;
    const description = question?.description!;
    const ownerEmail = question?.owner.email!;

    email.notifyOwner(ownerEmail, title, description, answer);
  } catch (error) {
    throw error;
  }
};

export default sendEmailToOwner;
