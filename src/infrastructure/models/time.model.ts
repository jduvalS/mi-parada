import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../db/sequelize.js";




export class Time extends Model<InferAttributes<Time>, InferCreationAttributes<Time>> {
    declare id: CreationOptional<number>;
    declare transportId: number;
    declare stopId: number;
    declare arrivalAt: Date;
}


export function initTime() {
    Time.init({
        id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        transportId:{type:DataTypes.INTEGER, allowNull:false, field:"transport_id"},
        stopId:{type:DataTypes.INTEGER, allowNull:false, field:"stop_id"},
        arrivalAt:{type:DataTypes.DATE, allowNull:false}
    }, {sequelize, tableName:"times", underscored:true});
}