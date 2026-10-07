import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/user.controller.js";

import {validate} from "../middlewares/validate.js";
import {
    userIdValidation,
    createUserValidation,
    updateUserValidation,
} from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.post("/users",createUserValidation, validate, createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", userIdValidation, validate, getUserById);
userRouter.put("/users/:id", userIdValidation, updateUserValidation, validate, updateUser);
userRouter.delete("/users/:id", userIdValidation, validate, deleteUser);