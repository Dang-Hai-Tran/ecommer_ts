import { Schema, model } from "mongoose";

interface IShop {
    name: string;
    email: string;
    password: string;
    status: "active" | "inactive";
    verify: boolean;
    roles: string[];
}

const ShopSchema = new Schema<IShop>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "inactive",
        },
        verify: {
            type: Boolean,
            default: false,
        },
        roles: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const ShopModel = model<IShop>("Shop", ShopSchema);

export { ShopModel, IShop };
