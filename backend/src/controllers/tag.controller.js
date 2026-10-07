import {tagModel} from "../models/tag.model.js";
import {articleModel} from "../models/article.model.js";
import { matchedData } from "express-validator";

export const getAllTags = async (req,res) => {
    try {
        const tags = await tagModel.findAll();
        return res.status(200).json(tags)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener los tags"});
    }
};

export const getTagById = async (req,res) => {
    try {
        const {id} = req.params;
        const tag = await tagModel.findByPk(id, {
            include: { model: articleModel, as: 'articles'}
        });
        if (!tag) return res.status(404).json({message: 'Tag no encontrado'});
        res.status(200).json(tag)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener el Tag"});
    }
};

export const createTag = async (req,res) => {
    try {
        const validatedData = matchedData(req);
        const tag = await tagModel.create(validatedData);

        return res.status(201).json(tag)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al crear el Tag"});
    }
};

export const updateTag = async (req, res) => {
    try{
        const validatedDataBody = matchedData(req, {locations: ["body"]});
        const {id} = matchedData(req, {locations: ["params"]});

        const tagExist = await tagModel.findByPk(id);
        if (!tagExist){
            return res.status(404).json({message: 'Tag no encontrado'});
        }
        await tagExist.update(validatedDataBody);
        return res.status(200).json({message: 'Tag editado correctamente'});
    } catch(error){
        return res.status(500).json({message: 'Error al actualizar el Tag'});
    }
}

export const deleteTag = async (req, res) => {
    try{
        const {id} = req.params;

        const tagExist = await tagModel.findByPk(id);
        if (!tagExist){
            return res.status(404).json({message: 'Tag no encontrado'});
        }

        await tagExist.destroy();

        return res.status(200).json({message: 'Tag eliminado correctamente'});
    } catch(error){
        return res.status(500).json({message: 'Error al eliminar el Tag'});
    }
}