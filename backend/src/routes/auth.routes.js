import { Router} from "express";
import {login, logout, register, getProfile, updateProfile} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js"
import { createUserValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";

export const authRouter = Router();

authRouter.post("/register", createUserValidation, validate, register);
authRouter.post("/login", login);
authRouter.get("/profile",authMiddleware, getProfile);
authRouter.put("/profile",authMiddleware, updateProfile);
authRouter.post("/logout", logout);
