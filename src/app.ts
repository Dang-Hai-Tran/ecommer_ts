import { NextFunction } from "connect";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { connectToMongo } from "./dbs/init.mongodb";
import mainRouter from "./routes";

const app: Express = express();

// Init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Connect to MongoDB
connectToMongo();

// Init routes
app.use("/api/v1", mainRouter);

export default app;
