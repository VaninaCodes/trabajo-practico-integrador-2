import { Router } from "express";
import {
    createArticle,
    deleteArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
} from "../controllers/article.controller.js";

import {validate} from "../middlewares/validate.js";
import {
  articleIdValidation,
  createArticleValidation,
  updateArticleValidation,
} from "../middlewares/validations/article.validation.js";

export const articleRouter = Router();

articleRouter.post("/articles", createArticleValidation, validate, createArticle);
articleRouter.get("/articles", getAllArticles);
articleRouter.get("/articles/:id",articleIdValidation, validate, getArticleById);
articleRouter.put("/articles/:id", articleIdValidation, updateArticleValidation, validate, updateArticle);
articleRouter.delete("/articles/:id", articleIdValidation, validate, deleteArticle);