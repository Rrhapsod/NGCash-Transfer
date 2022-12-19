import { Request, Response } from "express";
import { Error } from "../utils/Error";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

const { hash } = bcrypt;

export class UsersController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    if (String(username).length < 3) {
      throw new Error("O nome de usuário deve ter ao menos 3 caracteres");
    }

    if (
      String(password).length < 8 ||
      !/[0-9]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      throw new Error(
        "A senha deve ter ao menos 8 caracteres, um número e uma letra maiúscula."
      );
    }

    const userExists = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (userExists) {
      throw new Error("Este nome de usuário já existe, informe outro.");
    }
    const hashedPassword = await hash(password, 8);

    await prisma.accounts.create({
      data: {
        balance: 100.0,

        Users: {
          create: {
            username: username,
            password: hashedPassword,
          },
        },
      },
    });

    return response.status(201).json();
  }

  async search(request: Request, response: Response) {
    const { username } = request.params;

    const searchUsername = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!searchUsername) {
      throw new Error("Este usuário não existe!");
    }

    const searchUserAccount = await prisma.accounts.findUnique({
      where: {
        id: searchUsername?.id,
      },
      include: {
        Users: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!searchUserAccount) {
      throw new Error("Este usuário não existe!");
    }

    return response.json(searchUserAccount.id);
  }
}
