import type { NextApiRequest, NextApiResponse } from "next";
import { Link, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    await prisma.$connect();
    const { email, href, title, active } = JSON.parse(req.body);

    switch (req.method) {
      case "GET":
        const link = await prisma.link.findFirst({
          where: {
            id: `${id}`,
          },
        });

        res.status(200).json(link);
        break;
      case "POST":
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
      // Change link active prop
      case "PUT":
        const updated = await prisma.link.update({
          where: {
            id: `${id}`,
          },
          data: {
            active,
          },
        });

        res.status(201).json(updated);
        break;
      case "DELETE":
        await prisma.link.delete({
          where: {
            id: `${id}`,
          },
        });
        break;
      default:
        res.status(200);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
