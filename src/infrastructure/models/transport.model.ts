import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import{TransportType} from "../../domain/entities/transportType.js";


export class Transport extends Model< InferAttributes<Transport>, InferCreationAttributes<Transport>> {
    declare id: CreationOptional <number>;
    declare name: string;
    declare type: TransportType;
    declare syndicateId: number|null;
    declare ownerId:number | null;
}


export function initTransport() {
    Transport.init({
        id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        name:{type:DataTypes.STRING(150), allowNull:false},
        type:{type:DataTypes.INTEGER, allowNull:false, validate:{min:0,max:1}},
        syndicateId:{type:DataTypes.INTEGER, allowNull:true, field:"syndicate_id"},
        ownerId:{type:DataTypes.INTEGER, allowNull:true, field:"Owner_Id"}
    }, {sequelize, tableName:"transports", underscored:true});
}