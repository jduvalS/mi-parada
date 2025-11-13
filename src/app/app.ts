import express from "express";
import cors from "cors";
import helmet from "helmet";
import v1 from "../interfaces/http/routes/index";
import { apiLimiter } from "../middlewares/rateLimiter";
import { trimBodyStrings } from "../middlewares/sanitize";
import { requestLogger } from "../infrastructure/logging/requestLogger";
import { notFOund, errorHandler } from "../middlewares/error";






const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use(trimBodyStrings);
app.use(requestLogger);



app.get("/health", (_req, res)=> res.json({status:"ok"}));
app.use("/api/v1", v1);


app.use(notFOund);
app.use(errorHandler);
export default app;