import { Request, Response } from "express";
import { Error } from "../utils/Error";
import { prisma } from "../lib/prisma";

export class TransactionsController {
  async create(request: Request, response: Response) {
    const { debitId, creditId } = request.params;
    const { value } = request.body;

    const debitAccount = await prisma.accounts.findUnique({
      where: {
        id: Number(debitId),
      },
      include: {
        Users: {
          select: {
            id: true,
          },
        },
      },
    });

    const creditAccount = await prisma.accounts.findUnique({
      where: {
        id: Number(creditId),
      },
      include: {
        Users: {
          select: {
            id: true,
          },
        },
      },
    });

    const debitBalance = debitAccount?.balance;
    const newDebitValue = Number(debitBalance) - value;

    const creditBalance = creditAccount?.balance;
    const newCreditValue = Number(creditBalance) + value;

    await prisma.transactions.create({
      data: {
        value: value,
        debitedAccountId: Number(debitId),
        creditedAccountId: Number(creditId),
      },
    });

    await prisma.accounts.update({
      where: {
        id: Number(debitId),
      },
      data: {
        balance: newDebitValue,
      },
    });

    await prisma.accounts.update({
      where: {
        id: Number(creditId),
      },
      data: {
        balance: newCreditValue,
      },
    });

    return response.status(201).json();
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const debitTransactions = await prisma.transactions.findMany({
      where: {
        debitedAccountId: Number(id),
      },
    });

    const creditTransactions = await prisma.transactions.findMany({
      where: {
        creditedAccountId: Number(id),
      },
    });

    return response.json({
      debitTransactions,
      creditTransactions,
    });
  }
}
