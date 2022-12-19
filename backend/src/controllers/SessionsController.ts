import { Request, Response } from "express";
import { Error } from "../utils/Error";
import { prisma } from "../lib/prisma";
import * as authConfig from "../configs/auth";
import jwebt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const { compare } = bcrypt;
const { sign } = jwebt;

export class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new Error("Username e/ou senha incorreta!", 401);
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error("Username e/ou senha incorreta!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.status(201).json({ user, token });
  }
}
