import express from "express";
import TagController from "../controllers/tag.controller";

let router = express.Router();

router.get("/", TagController.getUniqueTags);

router.get("/:tag", TagController.getQuestionsByTag);

export default router;
