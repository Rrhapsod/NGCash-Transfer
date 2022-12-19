"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var users_routes_1 = require("./users.routes");
var sessions_routes_1 = require("./sessions.routes");
var accounts_routes_1 = require("./accounts.routes");
var transactions_routes_1 = require("./transactions.routes");
var router = (0, express_1.Router)();
exports.router = router;
router.use("/users", users_routes_1.usersRoutes);
router.use("/sessions", sessions_routes_1.sessionsRoutes);
router.use("/accounts", accounts_routes_1.accountsRoutes);
router.use("/transactions", transactions_routes_1.transactionsRoutes);
//# sourceMappingURL=index.js.map