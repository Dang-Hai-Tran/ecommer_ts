import compression from "compression";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectToMongo } from "./dbs/init.mongodb";
import mainRouter from "./routes";

const app: Express = express();

// Init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

// Connect to MongoDB
connectToMongo();

// Init routes
app.use("/api/v1", mainRouter);

export default app;
