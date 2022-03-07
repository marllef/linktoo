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
      case "GET":
        const users = await prisma.user.findMany({});
        res.status(200).json(users);
        break;

      default:
        res.status(200);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
