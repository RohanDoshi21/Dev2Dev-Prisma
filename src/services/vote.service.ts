import e from "express";
import { db } from "../utils/db.server";

const voteQuestion = async (
  questionId: number,
  vote: number,
  ownerId: number
) => {
  try {
    // Get previous vote if exists
    const previousVote = await db.questionVotes.findUnique({
      where: {
        owner_question_id: {
          owner: ownerId,
          question_id: questionId,
        },
      },
    });

    if (previousVote) {
      // get the value of previous vote
      const previousVoteValue = previousVote.status;

      // if previous vote is same as current vote, remove vote
      if (previousVoteValue === vote) {
        // Case 1: Remote Negetive Vote
        var data = {};
        if (vote === -1) {
          data = {
            downvotes: {
              decrement: 1,
            },
          };
        } else {
          data = {
            upvotes: {
              decrement: 1,
            },
          };
        }

        // Remove vote
        await db.questionVotes.delete({
          where: {
            owner_question_id: {
              owner: ownerId,
              question_id: questionId,
            },
          },
        });

        // Update question
        await db.question.update({
          where: {
            id: questionId,
          },
          data: data,
        });
      } else {
        // Case 2: Change vote
        var data = {};
        if (vote === -1) {
          data = {
            downvotes: {
              increment: 1,
            },
            upvotes: {
              decrement: 1,
            },
          };
        } else {
          data = {
            upvotes: {
              increment: 1,
            },
            downvotes: {
              decrement: 1,
            },
          };
        }

        // Update vote
        await db.questionVotes.update({
          where: {
            owner_question_id: {
              owner: ownerId,
              question_id: questionId,
            },
          },
          data: {
            status: vote,
          },
        });

        // Update question
        await db.question.update({
          where: {
            id: questionId,
          },
          data: data,
        });
      }
    } else {
      // Case 3: Add vote
      var data = {};
      if (vote === -1) {
        data = {
          downvotes: {
            increment: 1,
          },
        };
      } else {
        data = {
          upvotes: {
            increment: 1,
          },
        };
      }

      // Add vote
      await db.questionVotes.create({
        data: {
          status: vote,
          owner: ownerId,
          question_id: questionId,
        },
      });

      // Update question
      await db.question.update({
        where: {
          id: questionId,
        },
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const voteAnswer = async (answerId: number, vote: number, ownerId: number) => {
  try {
    // Get previous vote if exists
    const previousVote = await db.answerVotes.findUnique({
      where: {
        owner_answer_id: {
          owner: ownerId,
          answer_id: answerId,
        },
      },
    });

    if (previousVote) {
      // Get the value of previous vote
      const previousVoteValue = previousVote.status;

      // If previous vote is the same as current vote, remove vote
      if (previousVoteValue === vote) {
        // Case 1: Remove negative vote
        let data = {};
        if (vote === -1) {
          data = {
            downvotes: {
              decrement: 1,
            },
          };
        } else {
          data = {
            upvotes: {
              decrement: 1,
            },
          };
        }

        // Remove vote
        await db.answerVotes.delete({
          where: {
            owner_answer_id: {
              owner: ownerId,
              answer_id: answerId,
            },
          },
        });

        // Update answer
        await db.answer.update({
          where: {
            id: answerId,
          },
          data: data,
        });
      } else {
        // Case 2: Change vote
        let data = {};
        if (vote === -1) {
          data = {
            downvotes: {
              increment: 1,
            },
            upvotes: {
              decrement: 1,
            },
          };
        } else {
          data = {
            upvotes: {
              increment: 1,
            },
            downvotes: {
              decrement: 1,
            },
          };
        }

        // Update vote
        await db.answerVotes.update({
          where: {
            owner_answer_id: {
              owner: ownerId,
              answer_id: answerId,
            },
          },
          data: {
            status: vote,
          },
        });

        // Update answer
        await db.answer.update({
          where: {
            id: answerId,
          },
          data: data,
        });
      }
    } else {
      // Case 3: Add vote
      let data = {};
      if (vote === -1) {
        data = {
          downvotes: {
            increment: 1,
          },
        };
      } else {
        data = {
          upvotes: {
            increment: 1,
          },
        };
      }

      // Add vote
      await db.answerVotes.create({
        data: {
          status: vote,
          owner: ownerId,
          answer_id: answerId,
        },
      });

      // Update answer
      await db.answer.update({
        where: {
          id: answerId,
        },
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  voteQuestion,
  voteAnswer,
};
