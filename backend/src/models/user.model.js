import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";
import {profileModel} from "./profile.model.js";

export const userModel = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {len: [3, 20]}
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {isEmail: true}
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    }, 
}, {
        paranoid: true,
});

// relacion 1 a 1
userModel.hasOne(profileModel, {foreignKey: 'user_id', as: 'profile'});
profileModel.belongsTo(userModel, {foreignKey: 'user_id', as: 'user'});