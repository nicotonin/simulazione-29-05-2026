import { Response, NextFunction } from "express";
import userService from "./user.service";
import { TypedRequest } from "../../lib/typed-request.interface";

export const listUsers = async (
    req: TypedRequest<unknown, unknown>,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};