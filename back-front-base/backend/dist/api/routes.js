"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const user_router_1 = __importDefault(require("./user/user.router"));
const cliente_router_1 = __importDefault(require("./cliente/cliente.router"));
const consegna_router_1 = __importDefault(require("./consegna/consegna.router"));
const auth_middleware_1 = require("../lib/auth/auth.middleware");
const tracking_router_1 = __importDefault(require("./tracking/tracking.router"));
const router = (0, express_1.Router)();
router.use("/auth", auth_router_1.default);
router.use("/clienti", auth_middleware_1.isAuthenticated, cliente_router_1.default);
router.use("/consegne", auth_middleware_1.isAuthenticated, consegna_router_1.default);
router.use("/users", auth_middleware_1.isAuthenticated, user_router_1.default);
router.use("/tracking", tracking_router_1.default);
exports.default = router;
