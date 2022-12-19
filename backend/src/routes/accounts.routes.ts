import { Router, RequestHandler } from "express";
import { AccountsController } from "../controllers/AccountsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const accountsRoutes = Router();
const accountsController = new AccountsController();

accountsRoutes.use(ensureAuthenticated as RequestHandler);

accountsRoutes.get("/:id", accountsController.show);

export { accountsRoutes };
