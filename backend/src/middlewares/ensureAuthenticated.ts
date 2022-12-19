import { Request, Response, NextFunction } from "express";
import { Error } from "../utils/Error.js";
import * as authConfig from "../configs/auth";
import jwebt from "jsonwebtoken";

const { verify } = jwebt;

interface TypedRequest<T> extends Request {
  user: T;
}

export function ensureAuthenticated(
  request: TypedRequest<{ id: number }>,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new Error("JWT Token inválido", 401);
  }
}
