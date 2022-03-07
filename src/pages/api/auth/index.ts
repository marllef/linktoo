import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.$connect();
    switch (req.method) {
      case "GET": // fetch Users
        const users = await prisma.user.findMany({});
        res.status(200).json(users);
        break;

      case "POST": // Create or Update Users
        const { name, email, uid }: User = JSON.parse(req.body);

        const createdUser = await prisma.user.upsert({
          where: {
            email: email,
          },
          create: {
            email,
            name,
            username: email.split("@")[0],
            uid,
          },
          update: {
            name,
            uid,
          },
        });

        res.status(201).json(createdUser);

        break;
      default:
        res.status(200);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
