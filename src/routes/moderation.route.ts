import express from "express";
import expressController from "../controllers/express.controller";
import auth from "../middlewares/auth";

const router = express.Router();

// ROLE -> MODERATOR / USER
router.post("/make_moderator", auth.verifyModerator, expressController.addModerator);

// STATUS -> OPEN / CLOSED
router.patch("/change_status", auth.verifyModerator, expressController.changeStatus);

export default router;