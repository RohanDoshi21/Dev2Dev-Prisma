import express from "express";
import auth from "../middlewares/auth";
import QuestionController from "../controllers/question.controller";

let router = express.Router();

// SORT TYPES: most_recent, most_answered, most_upvoted, oldest && page
router.get("/", QuestionController.retrieveQuestions);

// SORT TYPES: most_recent, most_answered, most_upvoted, oldest && page
router.get(
  "/my_questions",
  auth.verifyUser,
  QuestionController.retrieveMyQuestions
);

router.get("/:id", QuestionController.retrieveQuestionById);

router.post("/total_pages", QuestionController.retrieveTotalPages);

router.post("/", auth.verifyUser, QuestionController.createQuestion);

router.put("/:id", auth.verifyUser, QuestionController.updateQuestion);

router.delete("/:id", auth.verifyUser, QuestionController.deleteQuestion);

// For IMAGE and VIDEO, provide the url of the image or video in the content field
router.post("/add_component", auth.verifyUser, QuestionController.addComponent);

export default router;
