import {tagModel} from "../models/tag.model.js";
import {articleModel} from "../models/article.model.js";
import {articleTagModel} from "../models/article_tag.model.js";

export const addTagToArticle = async (req,res) => {
    try {
        const {article_id, tag_id} = req.body;
        const article = await articleModel.findByPk(article_id);
        if(!article){
            return res.status(404).json({message: 'Articulo no encontrado'});
        }
        const tag = await tagModel.findByPk(tag_id);
        if (!tag){
            return res.status(404).json({message: 'Tag no encontrado'});
        }

        const existing = await articleTagModel.findOne({where: article_id, tag_id})
        if (existing){
            return res.status(400).json({message: 'El tag ya esta en este articulo'});
        }
        const newArticleTag = await articleTagModel.create({article_id, tag_id});
        return res.status(201).json(newArticleTag)
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error al agregar el tag al articulo"});
    }
};

export const removeTagFromArticle = async (req,res) => {
    try {
        const {articleTagId} = req.params;
        const articleTag = await articleTagModel.findByPk(articleTagId);
        if (!articleTag) return res.status(404).json({message: 'Relacion article-tag no encontrada'});
        
        await articleTag.destroy();
        res.status(200).json({message: "Tag removida del article"})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error remover el tag del article"});
    }
};