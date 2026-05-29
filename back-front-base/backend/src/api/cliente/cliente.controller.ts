import { Request, Response, NextFunction } from "express";
import clienteService from "./cliente.service";

export const listaClienti = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await clienteService.lista();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const dettaglioCliente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await clienteService.dettaglio(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const creaCliente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await clienteService.crea(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const modificaCliente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await clienteService.modifica(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const eliminaCliente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await clienteService.elimina(req.params.id);
    res.json({ message: "Cliente eliminato" });
  } catch (err) {
    next(err);
  }
};