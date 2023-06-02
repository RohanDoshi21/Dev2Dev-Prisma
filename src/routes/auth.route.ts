import express from "express";
import authValidation from "../validations/auth.validation";
import validate from "../middlewares/validate";
import AuthControllers from "../controllers/auth.controller";
const router = express.Router();

router.post("/login", validate(authValidation.login), AuthControllers.login);

router.post(
  "/signup",
  validate(authValidation.register),
  AuthControllers.register
);

// router.post("/logout", isAuthenticated, logout);

// router.get("/profile", isAuthenticated, profile);

export default router;
