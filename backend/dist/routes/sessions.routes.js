"use strict";
exports.__esModule = true;
exports.sessionsRoutes = void 0;
var express_1 = require("express");
var SessionsController_1 = require("../controllers/SessionsController");
var sessionsRoutes = (0, express_1.Router)();
exports.sessionsRoutes = sessionsRoutes;
var sessionsController = new SessionsController_1.SessionsController();
sessionsRoutes.post("/", sessionsController.create);
//# sourceMappingURL=sessions.routes.js.map