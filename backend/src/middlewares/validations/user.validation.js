import {body, param} from "express-validator";
import {userModel} from "../../models/user.model.js";
import { profileModel } from "../../models/profile.model.js";
const rolesPermitidos = ["user", "admin"];

export const userIdValidation = [
    param("id")
    .isInt({min: 1}).withMessage("El id debe ser un numero entero positivo")
    .custom(async(id)=>{
        const user = await userModel.findByPk(id);
        if(!user) throw new Error("El usuario no existe");
        return true;
    }),
];

export const createUserValidation = [
    body("username")
        .notEmpty().withMessage("El nombre de usuario no debe ser vacio")
        .isLength({min: 3, max:20}).withMessage("Los caracteres del nombre de usuario deben ser 3 minimo y 20 maximo")
        .isAlphanumeric().withMessage("El nombre de usuario solo puede contener letras y letras")
        .custom(async(username)=>{
            const existe = await userModel.findOne({where: {username}});
            if(existe) throw new Error("El nombre de usuario ya existe");
            return true;
        }),
    body("email")
        .notEmpty().withMessage("El email no debe ser vacio")
        .isEmail().withMessage("El email debe ser valido")
        //valido si ya existe
        .custom(async(email)=>{
            const existe = await userModel.findOne({where: {email}});
            if (existe) throw new Error("El email ya esta registrado");
            return true;
        }),
    body("password")
        .notEmpty().withMessage("La contraseña no debe ser vacia")
        .isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres")
        .custom((password)=>{
            if(!/[A-Z]/.test(password)) throw new Error("La contraseña debe tener al menos una letra mayuscula");
            if(!/[a-z]/.test(password)) throw new Error("La contraseña debe tener al menos una letra minuscula");
            if(!/[0-9]/.test(password)) throw new Error("La contraseña debe tener al menos un numero");
            return true;
        }),
    body("role")
        .optional()
        .isIn(rolesPermitidos).withMessage(`El rol solo puede ser: ${rolesPermitidos.join(", ")}`),
];

export const updateUserValidation = [
    param("id")
        .isInt({min: 1}).withMessage("El id debe ser un numero entero positivo")
        .custom(async(id)=>{
        const user = await userModel.findByPk(id);
        if(!user) throw new Error("El usuario no existe");
        return true;
    }),
    body("username")
        .optional()
        .isLength({min: 3, max:20}).withMessage("Los caracteres del nombre de usuario deben ser 3 minimo y 20 maximo")
        .isAlphanumeric().withMessage("El nombre de usuario solo puede contener numeros y letras")
        .custom(async(username, {req})=>{
            const existe = await userModel.findOne({where: {username}});
            if(existe && existe.id !== Number(req.params.id)) {
                throw new Error("El nombre de usuario ya existe"); }
            return true;
    }),
    body("email")
        .optional()
        .isEmail().withMessage("El email debe ser valido")
        //valido si ya existe
        .custom(async(email, {req})=>{
            const existe = await userModel.findOne({where: {email}});
            if (existe && existe.id !== Number(req.params.id)) {
                throw new Error("El email ya esta registrado");
            }
            return true;
    }),
    body("password")
        .optional()
        .isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres")
        .custom((password)=>{
            if(!/[A-Z]/.test(password)) throw new Error("La contraseña debe tener al menos una letra mayuscula");
            if(!/[a-z]/.test(password)) throw new Error("La contraseña debe tener al menos una letra minuscula");
            if(!/[0-9]/.test(password)) throw new Error("La contraseña debe tener al menos un numero");
            return true;
        }),
    body("role")
        .optional()
        .isIn(rolesPermitidos).withMessage(`El rol solo puede ser: ${rolesPermitidos.join(", ")}`),
];