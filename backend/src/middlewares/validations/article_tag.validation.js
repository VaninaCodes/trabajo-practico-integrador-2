import {body, param} from "express-validator";
import { articleModel } from "../../models/article.model.js";
import {tagModel} from "../../models/tag.model.js";
import {articleTagModel} from "../../models/article_tag.model.js";

export const createArticleTagValidation =[
    body("article_id")
        .notEmpty().withMessage("El article_id no debe ser vacio")
        .isInt({min: 1}).withMessage("El article_id debe ser un numero entero positivo")
        .custom(async(article_id)=>{
            const article = await articleModel.findByPk(article_id);
            if(!article){
                throw new Error("El articulo no existe");
            }
            return true;
        }),
    body("tag_id")
        .notEmpty().withMessage("El tag_id no debe ser vacio")
        .isInt({min: 1}).withMessage("El tag_id debe ser un numero entero positivo")
        .custom(async(tag_id)=>{
            const tag = await tagModel.findByPk(tag_id);
            if(!tag) {
                throw new Error("El tag no existe");
            }
            return true;
        }),
    body("tag_id")
        .custom(async(tag_id, {req})=>{
            const existing = await articleTagModel.findOne({
                where: {article_id: req.body.article_id, tag_id}
            });
            if(existing) {
                throw new Error("El tag ya esta asociado a este articulo");
            }
            return true;
    }),
];

export const articleTagIdValidation = [
    param("articleTagId")
        .isInt({min: 1}).withMessage("El id debe ser un numero entero positivo")
        .custom(async(articleTagId)=>{
        const articleTag = await articleTagModel.findByPk(articleTagId);
        if(!articleTag) { 
            throw new Error("La relacion article-tag no existe");
        }
        return true;
    })
]