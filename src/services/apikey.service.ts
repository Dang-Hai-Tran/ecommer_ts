import crypto from "crypto";
import { ApiKeyModel } from "../models/apiKey.model";

class ApiKeyService {
    static async findApiKeyByKey(key: string) {
        const objectApiKey = await ApiKeyModel.findOne({ key: key, status: true });
        return objectApiKey;
    }

    static async createNewApiKey() {
        const apiKey = crypto.randomBytes(64).toString("hex");
        await ApiKeyModel.create({
            key: apiKey,
            status: true,
            permisions: ["0000"],
        });
        return apiKey;
    }
}

export default ApiKeyService;
