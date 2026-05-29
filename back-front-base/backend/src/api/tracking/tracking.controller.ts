import { Request, Response, NextFunction } from "express";
import trackingService from "./tracking.service";

export const trackingConsegna = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { chiaveConsegna, dataRitiro } = req.body;

        const result = await trackingService.traccia(chiaveConsegna, dataRitiro);

        res.json(result);

    } catch (err) {
        next(err);
    }
};