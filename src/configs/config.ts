import dotenv from "dotenv";
dotenv.config();

const dev = {
    app: {
        port: process.env.DEV_PORT || "3000",
    },
    db: {
        host: process.env.DEV_DB_HOST || "localhost",
        port: process.env.DEV_DB_PORT || "27017",
        name: process.env.DEV_DB_NAME || "ecommerce_ts",
    },
};

const pro = {
    app: {
        port: process.env.PRO_PORT || "3000",
    },
    db: {
        host: process.env.PRO_DB_HOST || "localhost",
        port: process.env.PRO_DB_PORT || "27017",
        name: process.env.PRO_DB_NAME || "ecommerce_ts",
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
const currentConfig = env === "dev" ? config.dev : config.pro;

export default currentConfig;
