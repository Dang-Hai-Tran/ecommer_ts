import app from "./src/app";
import config from "./src/configs/config";
import { disconnectToMongo } from "./src/dbs/init.mongodb";

const port = config.app.port;
const server = app.listen(port, () => {
    console.log(`Server ecommerce start in port: ${port}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log(`\nServer closed`);
    });
    disconnectToMongo();
});
