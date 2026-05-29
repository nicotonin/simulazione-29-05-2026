import { Router } from "express";
import { trackingConsegna } from "./tracking.controller";


const router = Router();


router.post("/", trackingConsegna);

export default router;