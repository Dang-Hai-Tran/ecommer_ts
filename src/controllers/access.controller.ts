import { NextFunction, Request, Response } from "express";
import { SuccessReason, SuccessResponse, SuccessStatus } from "../response/success.response";
import AccessService from "../services/access.service";

class AccessController {
    public static async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            const data = await AccessService.signUp(name, email, password);
            const response = new SuccessResponse(SuccessReason.Created, SuccessStatus.Created, data);
            response.send(res);
        } catch (error) {
            return next(error);
        }
    }

    public static async logIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const data = await AccessService.logIn(email, password);
            const response = new SuccessResponse(SuccessReason.OK, SuccessStatus.OK, data);
            response.send(res);
        } catch (error) {
            return next(error);
        }
    }

    public static async logOut(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await AccessService.logOut(req.userId!);
            const response = new SuccessResponse(SuccessReason.OK, SuccessStatus.OK, data);
            response.send(res);
        } catch (error) {
            return next(error);
        }
    }
}

export default AccessController;
