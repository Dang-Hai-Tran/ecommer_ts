import { NextFunction, Request, Response } from "express";
import { ErrorResponse, ErrorStatus } from "../response/error.response";
import ApiKeyService from "../services/apikey.service";

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
};

declare global {
    namespace Express {
        interface Request {
            apiKey?: string; //Add apikey to Request
        }
    }
}

const apiKey = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
        throw new ErrorResponse("Api key isn't provided", ErrorStatus.Forbidden);
    }
    const objectApiKey = await ApiKeyService.findApiKeyByKey(key);
    if (!objectApiKey) {
        throw new ErrorResponse("Api key is invalid", ErrorStatus.Forbidden);
    }
    req.apiKey = key;
};
