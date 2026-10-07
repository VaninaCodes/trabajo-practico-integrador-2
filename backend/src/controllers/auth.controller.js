import {matchedData} from "express-validator";
import {comparePassword, hashPassword} from "../helpers/bcrypt.helper.js";
import {generateToken} from "../helpers/jwt.helper.js";
import {userModel} from "../models/user.model.js";
import { profileModel } from "../models/profile.model.js";

export const register = async (req, res) =>{
    try{
        const validatedData=matchedData(req);
        const hashPassword= await hashPassword(validatedData.password);
        const newUser = await userModel.create({
            username:validatedData.username,
            email: validatedData.email,
            password: hashPassword,
            role: validatedData.role || 'user',
        });
        await profileModel.create({user_id: newUser.id});
        return res.status(201).json({
            message: "Usuario registrado correctamente",
            user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role },
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Credenciales invalidas" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales invalidas" });
        }

        const token = generateToken({ id: user.id, role: user.role });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 5 * 60 * 60 * 1000, // 5 horas, igual que expiresIn del jwt.helper
        });

        return res.status(200).json({
            message: "Login exitoso",
            user: { id: user.id, username: user.username, role: user.role },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al iniciar sesion" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Sesion cerrada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al cerrar sesion" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const { id } = req.datosDelUsuarioLogeado;

        const user = await userModel.findByPk(id, {
            include: { model: profileModel, as: 'profile' },
        });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el perfil" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.datosDelUsuarioLogeado;
        const validatedData = matchedData(req);

        const profile = await profileModel.findOne({ where: { user_id: id } });
        if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

        await profile.update(validatedData);

        return res.status(200).json({ message: "Perfil actualizado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el perfil" });
    }
};