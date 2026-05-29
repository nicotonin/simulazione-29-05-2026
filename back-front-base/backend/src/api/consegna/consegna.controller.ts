import { Request, Response, NextFunction } from "express";
import consegnaService from "./consegna.service";
import { DeliveryStatus } from "./consegna.model";

// GET /api/consegne?clienteID=&DeliveryStatus=
export const listaConsegne = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const filtri = {
            clienteID: req.query.clienteID as string,
            DeliveryStatus: req.query.DeliveryStatus as DeliveryStatus
        };

        const result = await consegnaService.lista(filtri);

        res.json(result);

    } catch (err) {
        next(err);
    }
};

// GET /api/consegne/:id
export const dettaglioConsegna = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await consegnaService.dettaglio(req.params.id);

        res.json(result);

    } catch (err) {
        next(err);
    }
};

// POST /api/consegne
export const creaConsegna = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await consegnaService.crea(req.body);

        res.json(result);

    } catch (err) {
        next(err);
    }
};

// PUT /api/consegne/:id
export const modificaConsegna = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await consegnaService.modifica(req.params.id, req.body);

        res.json(result);

    } catch (err) {
        next(err);
    }
};

// DELETE /api/consegne/:id
export const eliminaConsegna = async (req: Request, res: Response, next: NextFunction) => {
    try {

        await consegnaService.elimina(req.params.id);

        res.json({ message: "Consegna eliminata" });

    } catch (err) {
        next(err);
    }
};

// PUT /api/consegne/:id/stato
export const aggiornaStatoConsegna = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await consegnaService.aggiornaStato(
            req.params.id,
            req.body.stato as DeliveryStatus
        );

        res.json(result);

    } catch (err) {
        next(err);
    }
};