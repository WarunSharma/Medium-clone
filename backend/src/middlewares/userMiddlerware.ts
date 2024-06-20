import { decodeToken } from "../utils/token";

export async function setUserId(c: any, next: () => {}) {
  try {
    const token = c.req.header("Authorization").split(" ")[1];
    if (!token)
      return c.json(
        {
          error: "Unauthorized",
          message: "Invalid authorization header format",
        },
        401
      );
    const user = await decodeToken(token, c.env.JWT_SECRET);
    if (!user)
      return c.json({ error: "Unauthorized", message: "Invalid Token" }, 401);
    console.log("User:", user);
    c.set('userId', user.id);
    await next();
  } catch (e) {
    return c.json({ error: e });
  }
}
