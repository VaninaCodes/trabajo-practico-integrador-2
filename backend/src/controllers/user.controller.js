import {userModel} from "../models/user.model.js";
import {profileModel} from "../models/profile.model.js";
import {articleModel} from "../models/article.model.js";
import { matchedData } from "express-validator";

export const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.findAll({
            include: {
                model: profileModel,
                as: 'profile'
            }
        });
        return res.status(200).json(users)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener los usuarios"});
    }
};

export const getUserById = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findByPk(id, {
            include: [
                { model: profileModel, as: 'profile'},
                { model: articleModel, as: 'articles'}
            ]
        });
        if (!user) return res.status(404).json({message: 'Usuario no encontrado'});
        res.status(200).json(users)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener el usuario"});
    }
};

export const createUser = async (req,res) => {
    try {
        const validatedData = matchedData(req);
        const user = await userModel.create(validatedData);

        return res.status(201).json(user)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al crear el usuario"});
    }
};

export const updateUser = async (req, res) => {
    try{
        const validatedDataBody = matchedData(req, {locations: ["body"]});
        const {id} = matchedData(req, {locations: ["params"]});

        const userExist = await userModel.findByPk(id);
        if (!userExist){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        await userExist.update(validatedDataBody);
        return res.status(200).json({message: 'Usuario editado correctamente'});
    } catch(error){
        return res.status(500).json({message: 'Error al actualizar el usuario'});
    }
}

export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;

        const userExist = await userModel.findByPk(id);
        if (!userExist){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        await userExist.destroy();

        return res.status(200).json({message: 'Usuario eliminado correctamente'});
    } catch(error){
        return res.status(500).json({message: 'Error al eliminar el usuario'});
    }
}