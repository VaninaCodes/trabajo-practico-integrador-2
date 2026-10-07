import {userModel} from "../models/user.model.js";
import {tagModel} from "../models/tag.model.js";
import {articleModel} from "../models/article.model.js";
import { matchedData } from "express-validator";

export const getAllArticles = async (req,res) => {
    try {
        const articles = await articleModel.findAll();
        return res.status(200).json(articles)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener los Articulos"});
    }
};

export const getArticleById = async (req,res) => {
    try {
        const {id} = req.params;
        const article = await articleModel.findByPk(id, {
            include: [
                { model: userModel, as: 'author', attributes: ['id', 'username'] },
                { model: tagModel, as: 'tags' }
            ]
        });
        if (!article) return res.status(404).json({message: 'Articulos no encontrado'});
        res.status(200).json(article);
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener el articulo"});
    }
};

export const createArticle = async (req,res) => {
    try {
        const validatedData = matchedData(req);
        const article = await articleModel.create(validatedData);

        return res.status(201).json(article)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al crear el articulo"});
    }
};

export const updateArticle = async (req, res) => {
    try{
        const validatedDataBody = matchedData(req, {locations: ["body"]});
        const {id} = matchedData(req, {locations: ["params"]});

        const articleExist = await articleModel.findByPk(id);
        if (!articleExist){
            return res.status(404).json({message: 'Aticulo no encontrado'});
        }
        await articleExist.update(validatedDataBody);
        return res.status(200).json({message: 'Articulo editado correctamente'});
    } catch(error){
        return res.status(500).json({message: 'Error al actualizar el articulo'});
    }
}

export const deleteArticle = async (req, res) => {
    try{
        const {id} = req.params;

        const articleExist = await tagModel.findByPk(id);
        if (!articleExist){
            return res.status(404).json({message: 'Articulo no encontrado'});
        }

        await articleExist.destroy();

        return res.status(200).json({message: 'Articulo eliminado correctamente'});
    } catch(error){
        return res.status(500).json({message: 'Error al eliminar el articulo'});
    }
}