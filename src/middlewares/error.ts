  export function notFOund(_req:any, res:any) {res.status(404).json({message:"Not found"}); }
export function errorHandler(err:any, _req:any, res:any) {
    const status = err?.status || 500;
    res.status(status).json({message: "Error", detail:err?.message || "Server error"});
}

