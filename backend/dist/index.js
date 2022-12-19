"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var Error_1 = require("./utils/Error");
var routes_1 = require("./routes");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(routes_1.router);
app.use(function (error, request, response, next) {
    if (error instanceof Error_1.Error) {
        return response.status(error.statusCode).json({
            status: "Erro",
            message: error.message
        });
    }
    console.error(error);
    return response.status(500).json({
        status: "Erro",
        message: "Erro interno do servidor"
    });
});
app.listen(3000, function () {
    return console.log("REST API server ready at: http://localhost:3000");
});
//# sourceMappingURL=index.js.map