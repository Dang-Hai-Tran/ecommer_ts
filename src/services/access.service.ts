import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Types } from "mongoose";
import { KeyTokenModel } from "../models/keyToken.model";
import { ShopModel } from "../models/shop.model";
import { ErrorResponse, ErrorStatus } from "../response/error.response";
import { createTokenPair } from "../utils/auth.util";
import { getInfoData } from "../utils/get.info.data";
import KeyTokenService from "./keyToken.service";

class AccessService {
    static async signUp(shopName: string, shopEmail: string, shopPassword: string) {
        const existedShop = await ShopModel.findOne({
            name: shopName,
            email: shopEmail,
        });
        if (existedShop) {
            throw new ErrorResponse("Shop already existed", ErrorStatus.BadRequest);
        }
        const hashedPassword = await bcrypt.hash(shopPassword, 10);
        const newShop = await ShopModel.create({
            name: shopName,
            email: shopEmail,
            password: hashedPassword,
        });
        const data = {
            shop: getInfoData(["_id", "name", "email"], newShop),
        };
        return data;
    }

    static async logIn(email: string, password: string) {
        const foundShop = await ShopModel.findOne({ email: email });
        if (!foundShop) {
            throw new ErrorResponse("Shop not registered", ErrorStatus.BadRequest);
        }
        const match = await bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new ErrorResponse("Password not match", ErrorStatus.Unauthorized);
        }
        const keyToken = await KeyTokenModel.findOne({ shop: foundShop._id });
        let privateKey: string, publicKey: string;
        if (keyToken) {
            privateKey = keyToken.privateKey;
            publicKey = keyToken.publicKey;
        } else {
            [privateKey, publicKey] = await new Promise((resolve, reject) => {
                crypto.generateKeyPair(
                    "ec",
                    {
                        namedCurve: "prime256v1",
                        publicKeyEncoding: {
                            type: "spki",
                            format: "pem",
                        },
                        privateKeyEncoding: {
                            type: "pkcs8",
                            format: "pem",
                        },
                    },
                    (err, publickey, privatekey) => {
                        if (err) {
                            return reject(new ErrorResponse("Generate keys error", ErrorStatus.InternalServerError));
                        }
                        resolve(([privateKey, publicKey] = [privatekey, publickey]));
                    }
                );
            });
            await KeyTokenService.createKeyToken(foundShop._id, publicKey, privateKey);
        }

        const payload = {
            shopId: foundShop.id,
            email: foundShop.email,
        };
        const tokens = await createTokenPair(payload, privateKey);
        const data = {
            shop: getInfoData(["_id", "name", "email"], foundShop),
            tokens,
        };
        return data;
    }

    static async logOut(userId: Types.ObjectId) {
        const objectKeyToken = await KeyTokenModel.deleteOne({ shop: userId });
        return objectKeyToken;
    }
}

export default AccessService;
