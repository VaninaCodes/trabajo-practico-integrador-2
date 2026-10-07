import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";

export const tagModel = sequelize.define("Tag", {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique:true,
        validate: {len: [3, 20]}
    }
});