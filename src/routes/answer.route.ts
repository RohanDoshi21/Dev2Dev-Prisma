import express from "express";
import auth from "../middlewares/auth";
import AnswerController from "../controllers/answer.controller";

let router = express.Router();

// GET all answers for a particular question
router.get("/:id", AnswerController.retrieveAnswerForQuestion);

router.post("/", auth.verifyUser, AnswerController.createAnswer);

router.put("/:id", auth.verifyUser, AnswerController.updateAnswer);

router.delete("/:id", auth.verifyUser, AnswerController.deleteAnswer);

export default router;
