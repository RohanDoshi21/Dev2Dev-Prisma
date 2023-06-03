import express from "express";
import moderationController from "../controllers/moderation.controller";
import auth from "../middlewares/auth";

const router = express.Router();

// ROLE -> MODERATOR / USER
router.post(
  "/make_moderator",
  auth.verifyModerator,
  moderationController.addModerator
);

// STATUS -> OPEN / CLOSED
router.patch(
  "/change_status",
  auth.verifyModerator,
  moderationController.changeStatus
);

export default router;
