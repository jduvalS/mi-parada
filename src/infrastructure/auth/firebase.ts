import admin from "firebase-admin";
import { existsSync, readFileSync } from "fs";
import { env } from "../../config/env";


let inited = false;
export function initFirebase() {
    if(inited) return;
    const{projectId, serviceAccountPath} = env.FIREBASE;

    if(!projectId) throw new Error("missing the FIREBASE_PROJECT_ID");

    if (serviceAccountPath && existsSync(serviceAccountPath)) {
        const svc = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
        admin.initializeApp({credential:admin.credential.cert(svc), projectId});

    }else if(process.env.GOOGLE_APPLICATION_CREDENTIALS && existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)){
        admin.initializeApp({credential:admin.credential.applicationDefault(), projectId});
    }else{
        throw new Error("Firebase credentials notfound");
    }

    inited = true;


}

export{admin};