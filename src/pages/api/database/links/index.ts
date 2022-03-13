import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.$connect();
    switch (req.method) {
      case "POST":
        const { email, href, title } = JSON.parse(req.body);

        const created = await prisma.link.create({
          data: {
            href,
            title,
            User: {
              connect: {
                email: `${email}`,
              },
            },
          },
        });

        res.status(201).json(created);

        break;
      default:
        res.status(200);
    }
  } catch (err: any) {
    console.log(err.message);
  } finally {
    await prisma.$disconnect();
  }
}
