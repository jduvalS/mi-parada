import type{Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import {initFirebase, admin} from "./firebase";



declare global{namespace Express {interface Request {user?: any;}}}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try{
        const hdr = req.headers.authorization || "";
        const token = hdr.startsWith("Bearer")? hdr.slice(7): "";
        if(!token) return res.status(401).json({message:"no Beaerer token"});


        if(env.AUTH_PROVIDER === "FIREBASE") {
            initFirebase();
            const decoded = await admin.auth().verifyIdToken(token);
            req.user = decoded;
            return(next);
        }
        const payload = jwt.verify(token, env.JWT.secret);
    req.user = payload;
    return next();

    } catch(e: any){
    return res.status(401).json({message:"no authorization", detail:e.message});
    }


    
    
}