import { Schema, Types, model } from "mongoose";

interface IKeyToken {
    shop: Types.ObjectId;
    publicKey: string;
    privateKey: string;
    refreshTokenUsed: string[];
}

// Save publicKey and Array[refressToken]
const KeyTokenSchema = new Schema<IKeyToken>(
    {
        shop: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Shop",
        },
        publicKey: {
            type: String,
            required: true,
        },
        privateKey: {
            type: String,
            required: true,
        },
        refreshTokenUsed: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const KeyTokenModel = model<IKeyToken>("KeyToken", KeyTokenSchema);

export { IKeyToken, KeyTokenModel };
