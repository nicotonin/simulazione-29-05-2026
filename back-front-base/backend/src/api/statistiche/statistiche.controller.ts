import { Request, Response, NextFunction } from "express";
import statisticheService from "./statistiche.service";

export const getStatisticheConsegne = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { dal, al, stato } = req.query;

        const result = await statisticheService.consegne(
            dal as string,
            al as string,
            stato as string
        );

        res.json(result);

    } catch (err) {
        next(err);
    }
};