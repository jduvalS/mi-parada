export function trimBodyStrings(req:any, _res:any, next:any) {
    if(req.body && typeof req.body === "object") {
        for (const k of Object.keys(req.body)) {
            if(typeof req.body[k] === "string") req.body[k] = req.body[k].trim();
        }
    } next();
}

//line 1 - argument type (any) added as workaround