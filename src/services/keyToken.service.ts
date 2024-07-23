import { Types } from "mongoose";
import { KeyTokenModel } from "../models/keyToken.model";

class KeyTokenService {
    static async createKeyToken(shopId: Types.ObjectId, publicKey: string, privateKey: string) {
        const objKeyToken = await KeyTokenModel.create({
            shop: shopId,
            publicKey: publicKey,
            privateKey: privateKey,
        });
        return { publicKey, privateKey };
    }

    static async findPublicKeyByShopId(shopId: Types.ObjectId) {
        const objKeyToken = await KeyTokenModel.findOne({
            shop: shopId,
        });
        return objKeyToken?.publicKey;
    }

    static async findPrivateKeyByShopId(shopId: Types.ObjectId) {
        const objKeyToken = await KeyTokenModel.findOne({
            shop: shopId,
        });
        return objKeyToken?.privateKey;
    }
}

export default KeyTokenService;
