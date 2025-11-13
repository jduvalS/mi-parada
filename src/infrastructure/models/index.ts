import{initUser, User} from "./user.model";
import { initSyndicate, Syndicate } from "./syndicate.model";
import { initStopStation, StopStation } from "./stopstation.model";
import { initTransport, Transport } from "./transport.model";
import { initTime, Time } from "./time.model";


export function initModels() {
    initUser(), initSyndicate(), initStopStation(), initTransport(), initTime()

    Transport.belongsTo(Syndicate, {foreignKey:"syndicateId"});
    Syndicate.hasMany(Transport,{foreignKey:"syndicateId"});

    Transport.belongsTo(Syndicate, {foreignKey:"ownerId"});
    User.hasMany(Transport,{foreignKey:"OwnerId"});

    Time.belongsTo(Transport,{foreignKey:"transportId"});
    Transport.hasMany(Time,{foreignKey:"transportId"});

    Time.belongsTo(StopStation,{foreignKey:"stopId"});
    StopStation.hasMany(Time, {foreignKey:"stopId"})
    
}

export{User, Syndicate, StopStation, Transport, Time};
