import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import { disconnectToMongo } from "./src/dbs/init.mongodb";
import currentConfig from "./src/configs/config";

try {
    const port = currentConfig.app.port;
    const server = app.listen(port, () => {
        console.log(`Server ecommerce start in port: ${port}`);
    });

    process.on("SIGINT", () => {
        server.close(() => {
            console.log(`\nServer closed`);
        });
        disconnectToMongo();
    });
} catch (err) {
    console.error("Error: ", err);
}
