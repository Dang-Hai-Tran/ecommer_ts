import { Schema, Types, model } from "mongoose";

interface IKeyToken {
    shop: Types.ObjectId;
    publicKey: string;
    refreshToken: string[];
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
        refreshToken: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const KeyTokenModel = model<IKeyToken>("KeyToken", KeyTokenSchema);

export { KeyTokenModel, IKeyToken };
