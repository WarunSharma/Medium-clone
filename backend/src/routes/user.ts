import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { generateToken } from "../utils/token";
import { initializePrisma } from "../middlewares/prismaMiddleware";
import { signinInput, signupInput } from "@warun/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    // userId: string
    prisma: any
  }
}>();

userRouter.post("/signup", initializePrisma, async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
	if (!success) {
		return c.json({ error: "invalid input" }, 400);
	}

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await generateToken(user, c.env.JWT_SECRET);

    return c.json(jwt);
  } catch (e) {
    return c.status(403);
  }
});

userRouter.post("/signin", initializePrisma, async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
	if (!success) {
		return c.json({ error: "invalid input" }, 400);
	}

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    const jwt = await generateToken(user, c.env.JWT_SECRET);
    return c.json(jwt);
  } catch (error) {
    c.status(403);
    return c.json({ error: error });
  }
});
