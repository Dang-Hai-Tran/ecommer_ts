import { connectToMongo, disconnectToMongo } from "../dbs/init.mongodb";
import ApiKeyService from "../services/apikey.service";

const createNewApiKey = async () => {
    try {
        const apiKey = await ApiKeyService.createNewApiKey();
        console.log("New API Key created: ", apiKey);
    } catch (error) {
        console.error("Error creating API key: ", error);
    }
};

connectToMongo();
createNewApiKey();

process.on("SIGINT", () => {
    console.log();
    disconnectToMongo();
});
