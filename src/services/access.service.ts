import bcrypt from "bcryptjs";
import crypto from "crypto";
import { ShopModel } from "../models/shop.model";
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
            return {
                code: 400,
                message: "Shop already existed",
                status: "error",
            };
        }
        const hashedPassword = await bcrypt.hash(shopPassword, 10);
        const newShop = await ShopModel.create({
            name: shopName,
            email: shopEmail,
            password: hashedPassword,
        });
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
            },
        });
        // Save public key in keytoken document
        await KeyTokenService.createKeyToken(newShop._id, publicKey);
        const payload = {
            userId: newShop._id,
            email: newShop.email,
        };
        const privateKeyObject = crypto.createPrivateKey(privateKey);
        const tokens = await createTokenPair(payload, privateKeyObject);
        console.log("Create token pair successfully: ", tokens);
        return {
            code: 201,
            message: "SignUp successfully",
            status: "success",
            metadata: {
                shop: getInfoData(["_id", "name", "email"], newShop),
                tokens,
            },
        };
    }
}

export default AccessService;
