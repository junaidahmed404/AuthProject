import express from "express";

import {
  login,
  logout,
  signup,
  varifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";

import { varifyToken } from "../middleware/VarifyToken.js";

// ______________________

const router = express.Router();

// ______________________

router.get("/check-auth", varifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/varify-email", varifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// ______________________

export default router;
