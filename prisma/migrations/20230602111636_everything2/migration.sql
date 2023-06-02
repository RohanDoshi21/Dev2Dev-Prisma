/*
  Warnings:

  - Made the column `description` on table `Answer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `AnswerVotes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `AnswerVotes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `QuestionVotes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `QuestionVotes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "upvotes" SET DEFAULT 0,
ALTER COLUMN "downvotes" SET DEFAULT 0,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "AnswerVotes" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "upvotes" SET DEFAULT 0,
ALTER COLUMN "downvotes" SET DEFAULT 0,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "QuestionVotes" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
