import dotenv from 'dotenv';
import { sequelize } from '../infrastructure/db/sequelize';
dotenv.config();

export const env = {
    PORT: Number(process.env.PORT || 3000),
    NODE_ENV: process.env.NODE_ENV || "development",
    DB: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USER || "postgres",
        pass: process.env.DB_PASS || "postgres",
        name: process.env.DB_NAME || "mi_parada",
    },
    JWT: {
        secret:process.env.JWT_SECRET || "change_it",
        expiresIN: process.env.JWT_EXPIRES_IN || "7d",
    },
    AUTH_PROVIDER: (process.env.AUTH_PROVIDER || "FIREBASE"). toUpperCase(),
    FIREBASE:{
        projectId: process.env.FIREBASE_PROJECT_ID || "",
        serviceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "",
        adcPath: process.env.GOOGLE_APPLICATION_CREDENTIALS

    }

};