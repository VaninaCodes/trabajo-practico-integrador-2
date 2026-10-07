import {body, param} from "express-validator";
import {articleModel} from "../../models/article.model.js";
import {userModel} from "../../models/user.model.js";

const estadosPermitidos = ["published", "archived"];

export const articleIdValidation = [
    param("id")
        .isInt({min: 1}).withMessage("El id debe ser un numero entero positivo")
        .custom(async(id)=>{
            const article = await articleModel.findByPk(id);
            if(!article){
                throw new Error("El articulo no existe");
            }
            return true;
        }),
];

export const createArticleValidation = [
    body("title")
        .notEmpty().withMessage("El titulo no debe ser vacio")
        .isLength({min: 3, max: 200}).withMessage("Los caracteres del titulo deben tener 3 minimo y 200 maximo"),
    body("content")
        .notEmpty().withMessage("El contenido no debe ser vacio")
        .isLength({min: 50}).withMessage("El contenido debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({max: 500}).withMessage("El resumen no puede superar los 500 caracteres"),
    body("status")
        .optional()
        .isIn(estadosPermitidos).withMessage(`El estado solo puede ser: ${estadosPermitidos}`)
        .custom(async(user_id)=>{
            const user = await userModel.findByPk(user_id);
            if(!user){
                throw new Error("El usuario del articulo no existe");
            }
            return true;
        }),
];

export const updateArticleValidation = [
    param("id")
        .isInt({min: 1}).withMessage("El id debe ser un numero entero positivo")
        .custom(async(id)=>{
            const article = await articleModel.findByPk(id);
            if(!article){
                throw new Error("El articulo no existe");
            }
            return true;
    }),
    body("title")
        .optional()
        .isLength({min: 3, max: 200}).withMessage("Los caracteres del titulo deben tener 3 minimo y 200 maximo"),
    body("content")
        .optional()
        .isLength({min: 50}).withMessage("El contenido debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({max: 500}).withMessage("El resumen no puede superar los 500 caracteres"),
    body("status")
        .optional()
        .isIn(estadosPermitidos).withMessage(`El estado solo puede ser: ${estadosPermitidos}`)
        .custom(async(user_id)=>{
            const user = await userModel.findByPk(user_id);
            if(!user){
                throw new Error("El usuario del articulo no existe");
            }
            return true;
        }),
];