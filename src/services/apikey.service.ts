import crypto from "crypto";
import { ApiKeyModel } from "../models/apiKey.model";

class ApiKeyService {
    static async findApiKeyByKey(key: string) {
        const objectApiKey = await ApiKeyModel.findOne({ key: key, status: true });
        return objectApiKey;
    }

    static async createNewApiKey() {
        const apiKeyString = crypto.randomBytes(64).toString("hex");
        const apiKey = await ApiKeyModel.create({
            key: apiKeyString,
            status: true,
            permisions: ["0000"],
        });
        return apiKey.key;
    }
}

export default ApiKeyService;
