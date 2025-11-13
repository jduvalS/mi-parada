import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../db/sequelize";



export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare passwordHash: string | null; 
    declare fullName: string;
    declare role: string;



}

export function initUser() {
    User.init({
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true  },
        email: {type: DataTypes.STRING(140), allowNull: false, unique:true},
        passwordHash:{type:DataTypes.STRING, allowNull:true},
        fullName:{type:DataTypes.STRING(240), allowNull:false},
        role:{type:DataTypes.STRING(40), allowNull:false, defaultValue:"user"}
    }, {sequelize, tableName: "users", underscored:true});

    }
