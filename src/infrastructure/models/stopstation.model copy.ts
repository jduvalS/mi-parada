import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../db/sequelize.js";






export class StopStation extends Model<InferAttributes<StopStation>, InferCreationAttributes<StopStation>> {
    declare id: CreationOptional <Number>;
    declare name: String;
    declare latitude: number | null;
    declare longitude: number | null;

}

export function initStopStation() {
    StopStation.init({
        id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        name: {type:DataTypes.STRING, allowNull:true},
        latitude:{type:DataTypes.FLOAT, allowNull:true},
        longitude:{type:DataTypes.FLOAT, allowNull:true}
    }, {sequelize, tableName: "stop-stations", underscored:true});
}


