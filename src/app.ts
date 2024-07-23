import compression from "compression";
import express, { ErrorRequestHandler, Express, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectToMongo } from "./dbs/init.mongodb";
import { ErrorReason, ErrorResponse, ErrorStatus } from "./response/error.response";
import mainRouter from "./routes";

const app: Express = express();

// Init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());

// Connect to MongoDB
connectToMongo();
// Init routes
app.use("/api/v1", mainRouter);

// Handle 404 not found
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorResponse(ErrorReason.NotFound, ErrorStatus.NotFound);
    return next(error);
});
// Error handling middleware
const errorHandler: ErrorRequestHandler = (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const code = error.code || 500;
    const message = error.message || "Internal Server Error";
    const response = new ErrorResponse(message, code);
    return response.send(res);
};
app.use(errorHandler);

export default app;
