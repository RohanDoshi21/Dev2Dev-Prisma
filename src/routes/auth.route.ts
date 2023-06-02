import express from "express";
import authValidation from "../validations/auth.validation";
import validate from "../middlewares/validate";
import AuthController from "../controllers/auth.controller";
import auth from "../middlewares/auth";
const router = express.Router();

router.post("/login", validate(authValidation.login), AuthController.login);

router.post(
  "/signup",
  validate(authValidation.register),
  AuthController.register
);

// router.post("/logout", isAuthenticated, logout);

router.get("/profile", auth.verifyUser, AuthController.profile);

export default router;
