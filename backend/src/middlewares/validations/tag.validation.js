import {body, param} from "express-validator";
import {tagModel} from "../../models/tag.model.js";

export const tagIdValidation = [
    param("id")
        .isInt({min:1}).withMessage("El id debe ser un numero positivo")
        .custom(async(id)=>{
            const tag = await tagModel.findByPk(id);
            if(!tag) throw new Error("El tag no existe");
            return true;
        }),
];

export const createTagValidation = [
    body("name")
        .notEmpty().withMessage("El nombre del tag no debe ser vacio")
        .isLength({min: 2, max: 30}).withMessage("Los caracteres del tag deben ser 2 minimo y 30 maximo")
        .custom((name)=>{
            if(/\s/.test(name)){
                throw new Error("El nombre del tag no debe contener espacios");
                return true;
            }
        })
        .custom(async(name)=>{
            const existe = await tagModel.findOne({where: {name}});
            if(existe){
                throw new Error("El tag ya existe");
                return true;
            }
        }),
];

export const updateTagValidation =[
    param("id")
        .isInt({min: 1}).withMessage("El id debe ser un numero entero positivo")
        .custom(async(id)=>{
        const tag = await tagModel.findByPk(id);
        if(!tag) throw new Error("El tag no existe");
        return true;
    }),
    body("name")
        .optional()
        .isLength({min: 2, max: 30}).withMessage("Los caracteres del tag deben ser 2 minimo y 30 maximo")
        .custom((name)=>{
            if(/\s/.test(name)) throw new Error("El nombre del tag no puede contener espacios");
            return true;
        })
        .custom(async(name, {req})=>{
            const existe = await tagModel.findOne({where: {name}});
            if(existe && existe.id !== Number(req.params.id)) {
                throw new Error("El tag ya existe");
            }
            return true;
        }),
];