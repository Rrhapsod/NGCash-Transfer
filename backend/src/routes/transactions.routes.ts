import { Router, RequestHandler } from "express";
import { TransactionsController } from "../controllers/TransactionsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const transactionsRoutes = Router();
const transactionsController = new TransactionsController();

transactionsRoutes.use(ensureAuthenticated as RequestHandler);

transactionsRoutes.post("/:debitId/:creditId", transactionsController.create);
transactionsRoutes.get("/:id", transactionsController.show);

export { transactionsRoutes };
