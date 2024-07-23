import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { ShopModel } from "../models/shop.model";
import { ErrorResponse, ErrorStatus } from "../response/error.response";
import ApiKeyService from "../services/apikey.service";
import KeyTokenService from "../services/keyToken.service";
import { isValidToken } from "./auth.util";

const HEADERS = {
    AUTHORIZATION: "authorization",
    API_KEY: "x-api-key",
    USER_ID: "x-user-id",
};

declare global {
    namespace Express {
        interface Request {
            apiKey?: string; //Add apikey to Request
            userId?: Types.ObjectId; //Add userId to Request
        }
    }
}

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check apikey
        const apiKey = req.headers[HEADERS.API_KEY]?.toString();
        if (!apiKey) {
            throw new ErrorResponse("ApiKey not provided", ErrorStatus.Unauthorized);
        }
        const objApiKey = await ApiKeyService.findApiKeyByKey(apiKey);
        if (!objApiKey) {
            throw new ErrorResponse("Api key invalid", ErrorStatus.BadRequest);
        }
        const userId = req.headers[HEADERS.USER_ID]?.toString();
        if (!userId) {
            throw new ErrorResponse("UserId not provided", ErrorStatus.Unauthorized);
        }
        const objUserId = new Types.ObjectId(userId);
        const objShop = await ShopModel.findById(objUserId);
        if (!objShop) {
            throw new ErrorResponse("User not found", ErrorStatus.NotFound);
        }
        const accessToken = req.headers[HEADERS.AUTHORIZATION]?.toString().split(" ")[1];
        if (!accessToken) {
            throw new ErrorResponse("Access token not provided", ErrorStatus.Unauthorized);
        }
        // Verify token
        const publicKey = await KeyTokenService.findPublicKeyByShopId(objUserId);
        if (!publicKey) {
            throw new ErrorResponse("Key token not found", ErrorStatus.Unauthorized);
        }
        const shopEmail = objShop.email;
        const payload = {
            email: shopEmail,
            shopId: userId,
        };
        if (!isValidToken(accessToken, publicKey, payload)) {
            throw new ErrorResponse("Access token invalid", ErrorStatus.Unauthorized);
        }
        req.apiKey = apiKey;
        req.userId = objUserId;
        return next();
    } catch (error) {
        return next(error);
    }
};

export { authentication };
