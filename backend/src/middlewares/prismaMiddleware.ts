import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function initializePrisma(c: any, next:()=>{}) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    c.set("prisma", prisma);  
    await next();
}