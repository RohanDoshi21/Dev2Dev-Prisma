-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "AnswerVotes" DROP CONSTRAINT "AnswerVotes_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionVotes" DROP CONSTRAINT "QuestionVotes_question_id_fkey";

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVotes" ADD CONSTRAINT "QuestionVotes_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerVotes" ADD CONSTRAINT "AnswerVotes_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
