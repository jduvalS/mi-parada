import express from 'express';

const app = express();

app.get("/", (_req,res)=>{
    res.send("Weccome to my Bus Stop API");
});

export default app;