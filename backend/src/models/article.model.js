import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";
import {userModel} from "./user.model.js";

export const articleModel = sequelize.define("Article", {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {len: [3, 200]}
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {len: [50, 100000]}
    },
    excerpt: {type: DataTypes.STRING(500)},
    status: {
        type: DataTypes.ENUM('published', 'archived'),
        defaultValue: 'published',
    }, 
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// relacion 1 a muchos
userModel.hasMany(articleModel, {foreignKey: 'user_id', as: 'articles'});
articleModel.belongsTo(userModel, {foreignKey: 'user_id', as: 'author'});