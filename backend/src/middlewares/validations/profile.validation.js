import {body} from "express-validator";

export const updateProfileValidation = [
    body("first_name")
        .optional()
        .isLength({min: 2, max: 50}).withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .isAlphanumeric().withMessage("El nombre solo puede contener numeros y letras"),
    body("last_name")
        .optional()
        .isLength({min: 2, max: 50}).withMessage("El apellidp debe tener entre 2 y 50 caracteres")
        .isAlphanumeric().withMessage("El apellido solo puede contener numeros y letras"),
    body("biography")
        .optional()
        .isLength({max: 500}).withMessage("La biografia no puede superar los 500 caracteres"),
    body("avatar_url")
        .optional()
        .isURL().withMessage("El avatar debe ser una URL valida"),
];