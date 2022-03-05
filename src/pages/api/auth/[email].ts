import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.$connect();

    const { email } = req.query;

    switch (req.method) {
      case "GET":
        const users = await prisma.user.findFirst({
          where: {
            uid: `${email}`,
          },
        });

        res.status(200).json(users);
        break;
      case "DELETE":
        const delUser = await prisma.user.delete({
          where: {
            uid: `${email}`,
          },
        });

        res.status(200).json(delUser);
        break;
      default:
        res.status(200);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
