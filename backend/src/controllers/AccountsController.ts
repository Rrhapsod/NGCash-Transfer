import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class AccountsController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const userAccount = await prisma.accounts.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Users: {
          select: {
            id: true,
          },
        },
      },
    });

    const balance = userAccount?.balance;

    return response.json({
      balance,
    });
  }
}
