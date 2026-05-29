import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middleware";
import { validate } from "../../lib/validation-middleware";
import { CreateClienteDTO } from "./cliente.dto";

import {
  listaClienti,
  dettaglioCliente,
  creaCliente,
  modificaCliente,
  eliminaCliente
} from "./cliente.controller";

const router = Router();

router.use(isAuthenticated);

router.get("/", listaClienti);
router.get("/:id", dettaglioCliente);
router.post("/", validate(CreateClienteDTO), creaCliente);
router.put("/:id", modificaCliente);
router.delete("/:id", eliminaCliente);

export default router;