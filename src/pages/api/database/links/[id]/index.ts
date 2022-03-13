import type { NextApiRequest, NextApiResponse } from "next";
import { Link, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    await prisma.$connect();

    switch (req.method) {
      case "GET":
        const link = await prisma.link.findFirst({
          where: {
            id: `${id}`,
          },
        });

        res.status(200).json(link);
        break;

      // Change link active prop
      case "PUT":
        const { active, href, title } = JSON.parse(req.body);
        const updated = await prisma.link.update({
          where: {
            id: `${id}`,
          },
          data: {
            href,
            title,
            active,
          },
        });

        res.status(201).json(updated);
        break;
      case "DELETE":
        const deleted = await prisma.link.delete({
          where: {
            id: `${id}`,
          },
        });

        res.status(200).json(deleted);
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
