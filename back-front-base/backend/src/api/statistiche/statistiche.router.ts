import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { getStatisticheConsegne } from "./statistiche.controller";

const router = Router();

router.use(isAuthenticated);


router.get("/consegne", getStatisticheConsegne);

export default router;