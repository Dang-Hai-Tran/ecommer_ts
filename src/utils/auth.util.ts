import jsonwebtoken, { JwtPayload, Secret } from "jsonwebtoken";
import { Types } from "mongoose";
import { KeyTokenModel } from "../models/keyToken.model";
import { ShopModel } from "../models/shop.model";
import { ErrorResponse, ErrorStatus } from "../response/error.response";

interface PayLoad extends JwtPayload {
    email: string;
    shopId: string;
}

const createTokenPair = (payload: JwtPayload, privateKey: Secret) => {
    return new Promise((resolve, reject) => {
        try {
            const accessToken = jsonwebtoken.sign(payload, privateKey, {
                algorithm: "ES256",
                expiresIn: "2 days",
            });

            const refreshToken = jsonwebtoken.sign(payload, privateKey, {
                algorithm: "ES256",
                expiresIn: "7 days",
            });
            resolve({ accessToken, refreshToken });
        } catch (error) {
            reject(new ErrorResponse("Sign tokens error", ErrorStatus.InternalServerError));
        }
    });
};

const isValidToken = (token: string, publicKey: Secret, payload: PayLoad) => {
    try {
        const decode = jsonwebtoken.verify(token, publicKey) as PayLoad;
        if (decode.email != payload.email || decode.shopId != payload.shopId) {
            return false;
        }
        return Date.now() < decode.exp! * 1000;
    } catch (error) {
        // console.log(error);
        throw new ErrorResponse(`Token invalid`, ErrorStatus.Unauthorized);
    }
};

const refreshAccessToken = async (refresh_token: string, userId: Types.ObjectId) => {
    const shop = await ShopModel.findById(userId);
    if (!shop) {
        throw new ErrorResponse("User not found", ErrorStatus.BadRequest);
    }
    const shopEmail = shop.email;
    const shopId = userId.toString();
    const keyToken = await KeyTokenModel.findOne({ shop: userId });
    if (!keyToken) {
        throw new ErrorResponse("Key token not found", ErrorStatus.BadRequest);
    }
    const publicKey = keyToken.publicKey;
    const privateKey = keyToken.privateKey;
    const payload = {
        email: shopEmail,
        shopId: shopId,
    };
    if (!isValidToken(refresh_token, publicKey, payload)) {
        throw new ErrorResponse("Refresh token invalid", ErrorStatus.BadRequest);
    }
    keyToken.refreshTokenUsed.push(refresh_token);
    const accessToken = jsonwebtoken.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "2 days",
    });
    const refreshToken = jsonwebtoken.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "7 days",
    });
    return { accessToken, refreshToken };
};

export { createTokenPair, isValidToken, refreshAccessToken };
