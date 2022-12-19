import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";
import { accountsRoutes } from "./accounts.routes";
import { transactionsRoutes } from "./transactions.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/accounts", accountsRoutes);
router.use("/transactions", transactionsRoutes);

export { router };
