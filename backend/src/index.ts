import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import { Error } from "./utils/Error";

import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(error.statusCode).json({
        status: "Erro",
        message: error.message,
      });
    }
    console.error(error);

    return response.status(500).json({
      status: "Erro",
      message: "Erro interno do servidor",
    });
  }
);

const port = 3000;

app.listen(port, "0.0.0.0");
