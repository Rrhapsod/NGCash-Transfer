"use strict";
exports.__esModule = true;
exports.usersRoutes = void 0;
var express_1 = require("express");
var UsersController_1 = require("../controllers/UsersController");
var usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
var usersController = new UsersController_1.UsersController();
usersRoutes.post("/", usersController.create);
usersRoutes.get("/:username", usersController.search);
//# sourceMappingURL=users.routes.js.map