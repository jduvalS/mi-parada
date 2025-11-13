import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../db/sequelize.js";


export class Syndicate extends Model<InferAttributes<Syndicate>, InferCreationAttributes<Syndicate>> {
    declare id: CreationOptional<number>;
    declare name: string;
}




    export function initSyndicate() {
        Syndicate.init( { 
            id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
            name:{type:DataTypes.STRING(130), allowNull:false, unique:true}
        },{sequelize, tableName:"syndicates", underscored:true}

        );
    }