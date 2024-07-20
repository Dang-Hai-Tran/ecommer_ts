import jsonwebtoken, { JwtPayload, Secret } from "jsonwebtoken";

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

const verifyToken = (token: string, publicKey: Secret, payload: JwtPayload) => {
    const decode = jsonwebtoken.verify(token, publicKey);
    if (decode === payload) {
        return true;
    }
    return false;
};

export { createTokenPair, verifyToken };
