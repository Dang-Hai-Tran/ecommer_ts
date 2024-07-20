import { Schema, model } from "mongoose";

interface IApiKey {
    key: string;
    status: boolean;
    permisions: string[];
}

const ApiKeySchema = new Schema<IApiKey>(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        permisions: {
            type: [String],
            required: true,
            enum: ["0000", "1111", "2222"],
        },
    },
    {
        timestamps: true,
    }
);

const ApiKeyModel = model<IApiKey>("ApiKey", ApiKeySchema);

export { ApiKeyModel, IApiKey };
