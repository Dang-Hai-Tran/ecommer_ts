import { Types } from "mongoose";
import { KeyTokenModel } from "../models/keyToken.model";

class KeyTokenService {
    static async createKeyToken(shopId: Types.ObjectId, publicKey: string) {
        await KeyTokenModel.create({
            shop: shopId,
            publicKey: publicKey,
        });
        return publicKey;
    }
}

export default KeyTokenService;
