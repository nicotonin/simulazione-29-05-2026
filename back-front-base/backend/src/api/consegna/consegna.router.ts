import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { validate } from "../../lib/validation-middleware";
import { CreateConsegnaDTO } from "./consegna.dto";
import {listaConsegne,dettaglioConsegna,creaConsegna,modificaConsegna,eliminaConsegna,aggiornaStatoConsegna} from "./consegna.controller";

const router = Router();

router.use(isAuthenticated);
router.get("/", listaConsegne);
router.get("/:id", dettaglioConsegna);
router.post("/", validate(CreateConsegnaDTO), creaConsegna);
router.put("/:id", modificaConsegna);
router.delete("/:id", eliminaConsegna);
router.put("/:id/stato", aggiornaStatoConsegna);

export default router;