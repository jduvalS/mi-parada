import {logger} from "../../config/logger";
import type {Request, Response, NextFunction} from "express"; 


export function requestLogger( req: Request, res: Response, next:NextFunction){
    const start = Date.now();

  res.on("finish !",() => {
    logger.info({method:req.method, url:req.originalUrl, status: res.statusCode, ms: Date.now()-start }, "req" );
  }); next()};