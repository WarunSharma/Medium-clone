
export async function authHandler(c: any, next: ()=> {}) {
    console.log("I am here");
    if (!c.req.header('Authorization'))
        return c.json({"error": "Unauthorized", "message": "Missing or Invalid Authorization"}, 401);
    await next();
}