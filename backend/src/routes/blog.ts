import { Hono } from "hono";
import { authHandler } from "../middlewares/authMiddleware";
import { setUserId } from "../middlewares/userMiddlerware";
import { initializePrisma } from "../middlewares/prismaMiddleware";
import { createBlogInput, updateBlogInput } from "@warun/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();
blogRouter.get("/bulk", authHandler, initializePrisma, async (c) => {
  const prisma = c.get("prisma");

  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(posts);
  } catch (err) {
    return c.json({ error: "Unexpected Error" + err }, 401);
  }
});

blogRouter.get("/:id", authHandler, initializePrisma, async (c) => {
  const prisma = c.get("prisma");
  const id = c.req.param("id");
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json(post);
  } catch (err) {
    c.json({ error: "Unexpected Error" }, 401);
  }
});

blogRouter.post("/", authHandler, setUserId, initializePrisma, async (c) => {
  const prisma = c.get("prisma");
  console.log("HERE");
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    return c.json({ error: "invalid input" }, 400);
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (err) {
    c.json({ error: "Unexpected Error" }, 401);
  }
});

blogRouter.put("/", authHandler, setUserId, initializePrisma, async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    return c.json({ error: "invalid input" }, 400);
  }
  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ message: "Updated" });
  } catch (err) {
    return c.json({ error: "Unexpected Error" }, 401);
  }
});
