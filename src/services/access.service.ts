import bcrypt from "bcryptjs";
import crypto from "crypto";
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

    static async logIn(email: string, password: string, refreshToken?: string) {
        const foundShop = await ShopModel.findOne({ email: email });
        if (!foundShop) {
            throw new ErrorResponse("Shop not registered", ErrorStatus.BadRequest);
        }
        const match = await bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new ErrorResponse("Password not match", ErrorStatus.Forbidden);
        }
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
        await KeyTokenService.createKeyToken(foundShop._id, publicKey);
        const payload = {
            shopId: foundShop.id,
            email: foundShop.email,
        };
        const privateKeyObject = crypto.createPrivateKey(privateKey);
        const tokens = await createTokenPair(payload, privateKeyObject);
        // console.log("Create token pair successfully: ", tokens);
        const data = {
            shop: getInfoData(["_id", "name", "email"], foundShop),
            tokens,
        };
        return data;
    }
}

export default AccessService;
