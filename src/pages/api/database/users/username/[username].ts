import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;
  try {
    await prisma.$connect();

    switch (req.method) {
      case "GET": // getLinksByUsername
        const { links } = await prisma.user.findUnique({
          where: {
            username: `${username}`,
          },
          select: {
            links: {
              where: {
                active: {
                  equals: true,
                },
              },
            },
          },
          rejectOnNotFound: true,
        });

        res.status(200).json(links);
        break;

      default:
        res.status(404);
    }
  } catch (err: any) {
    console.log(err.message);
  } finally {
    prisma.$disconnect();
  }
}
