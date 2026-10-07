import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";
import {articleModel} from "./article.model.js";
import {tagModel} from "./tag.model.js";

export const articleTagModel = sequelize.define("Article_Tag", {
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// relacion muchos a muchos
articleModel.belongsToMany(tagModel ,{ through: articleTagModel, foreignKey: 'article_id',
    as: 'tags', otherKey: 'tag_id', onDelete: 'CASCADE'
});

tagModel.belongsToMany(articleModel, {through: articleTagModel, foreignKey: 'tag_id',
    as:'articles', otherKey:'article_id'
});