import { Router } from "express";

import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";

import clienteRouter from "./cliente/cliente.router";
import consegnaRouter from "./consegna/consegna.router";

import { isAuthenticated } from "../lib/auth/auth.middleware";

const router = Router();

router.use("/auth", authRouter);

router.use("/clienti", isAuthenticated, clienteRouter);

router.use("/consegne", isAuthenticated, consegnaRouter);

router.use("/users", isAuthenticated, userRouter);

export default router;