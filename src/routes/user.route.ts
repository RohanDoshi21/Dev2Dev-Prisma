import express from "express";

import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

export default router;
