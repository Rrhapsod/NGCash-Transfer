"use strict";
exports.__esModule = true;
exports.transactionsRoutes = void 0;
var express_1 = require("express");
var TransactionsController_1 = require("../controllers/TransactionsController");
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var transactionsRoutes = (0, express_1.Router)();
exports.transactionsRoutes = transactionsRoutes;
var transactionsController = new TransactionsController_1.TransactionsController();
transactionsRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
transactionsRoutes.post("/:debitId/:creditId", transactionsController.create);
transactionsRoutes.get("/:id", transactionsController.show);
//# sourceMappingURL=transactions.routes.js.map