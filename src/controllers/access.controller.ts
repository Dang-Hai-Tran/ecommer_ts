import { Request, Response, NextFunction } from "express";
import { ShopModel, IShop } from "../models/shop.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AccessController {
    public static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password } = req.body;
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // Create new shop
            const newShop = new ShopModel({
                name,
                email,
                password: hashedPassword,
            });
            await newShop.save();

            // Generate token
            const token = this.generateToken(newShop);

            res.status(200).json({
                message: `New shop created`,
            });
        } catch (err) {
            next(err);
        }
    }

    private generateToken(shop: IShop): string {
        return jwt.sign({id: shop._id}, )
    }
}

export default AccessController;
