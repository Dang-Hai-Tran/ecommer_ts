import jsonwebtoken, { JwtPayload, Secret } from "jsonwebtoken";

interface PayLoad extends JwtPayload {
    email: string;
    shopId: string;
}

const createTokenPair = async (payload: JwtPayload, privateKey: Secret) => {
    const accessToken = jsonwebtoken.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "2 days",
    });

    const refreshToken = jsonwebtoken.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "7 days",
    });
    return { accessToken, refreshToken };
};

const verifyToken = (token: string, publicKey: Secret, payload: PayLoad) => {
    const decode = jsonwebtoken.verify(token, publicKey) as PayLoad;
    if (decode.email === payload.email && decode.shopId === payload.shopId) {
        return true;
    }
    return false;
};

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jsonwebtoken.decode(token) as JwtPayload;
        if (decoded && decoded.exp) {
            return Date.now() >= decoded.exp * 1000;
        }
        return true;
    } catch (error) {
        return true;
    }
};

export { createTokenPair, isTokenExpired, verifyToken };
