import { NextFunction, Request, Response } from "express";
import AccessService from "../services/access.service";

class AccessController {
    public static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const msg = await AccessService.signUp(name, email, password);
            res.status(msg.code).json(msg);
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }
}

export default AccessController;
