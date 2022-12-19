"use strict";
exports.__esModule = true;
exports.accountsRoutes = void 0;
var express_1 = require("express");
var AccountsController_1 = require("../controllers/AccountsController");
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var accountsRoutes = (0, express_1.Router)();
exports.accountsRoutes = accountsRoutes;
var accountsController = new AccountsController_1.AccountsController();
accountsRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
accountsRoutes.get("/:id", accountsController.show);
//# sourceMappingURL=accounts.routes.js.map