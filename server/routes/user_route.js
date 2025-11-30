import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../Controller/userControler.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
import passport from "../Controller/passport.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// Existing routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

// Google OAuth routes
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
  }),
  (req, res) => {
    generateToken(res, req.user, "Login successful");
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

// GitHub OAuth routes
router.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`,
  }),
  (req, res) => {
    generateToken(res, req.user, "Login successful");
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

export default router;
