-- CreateEnum
CREATE TYPE "StatusStates" AS ENUM ('OPEN', 'CLOSED', 'BANNED');

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "ownerId" INTEGER NOT NULL,
    "upvotes" INTEGER,
    "downvotes" INTEGER,
    "created_at" TIMESTAMP(3),
    "status" "StatusStates" DEFAULT 'OPEN',
    "tag" TEXT[],

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "ownerId" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "upvotes" INTEGER,
    "downvotes" INTEGER,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionVotes" (
    "id" SERIAL NOT NULL,
    "status" INTEGER,
    "owner" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "QuestionVotes_pkey" PRIMARY KEY ("owner","question_id")
);

-- CreateTable
CREATE TABLE "AnswerVotes" (
    "id" SERIAL NOT NULL,
    "status" INTEGER,
    "owner" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "AnswerVotes_pkey" PRIMARY KEY ("owner","answer_id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVotes" ADD CONSTRAINT "QuestionVotes_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVotes" ADD CONSTRAINT "QuestionVotes_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerVotes" ADD CONSTRAINT "AnswerVotes_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerVotes" ADD CONSTRAINT "AnswerVotes_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
