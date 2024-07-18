// Write class MongoDB by Singleton pattern to ensure only one instance can exist at a time
import mongoose, { Connection } from "mongoose";
import { countConnections } from "../utils/check.connect";
import currentConfig from "../configs/config";

class MongoDB {
    private static instance: MongoDB;
    private connection: Connection;

    private constructor() {
        this.connection = mongoose.connection;
    }

    public static getInstance(): MongoDB {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }

    public async connect(uri: string): Promise<void> {
        await mongoose.connect(uri, {
            maxPoolSize: 100, // Depend on CPU and Memory
        });
        console.log("Connected to MongoDB.");
        countConnections();
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log("Disconnected to MongoDB.");
    }

    public getConnection(): Connection {
        return this.connection;
    }
}

async function connectToMongo() {
    const mongoInstance = MongoDB.getInstance();
    const dbHost = currentConfig.db.host;
    const dbPort = currentConfig.db.port;
    const dbName = currentConfig.db.name;
    const mongodbUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    console.log(`MongoDB listening on ${mongodbUri}`);
    await mongoInstance.connect(mongodbUri);
}

async function disconnectToMongo() {
    const mongoInstance = MongoDB.getInstance();
    await mongoInstance.disconnect();
}

export { connectToMongo, disconnectToMongo };
