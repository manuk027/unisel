import express from "express";
import { registerUser, loginUser, googleAuthUser } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/google", googleAuthUser);

export default authRouter;