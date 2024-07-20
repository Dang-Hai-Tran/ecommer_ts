import { Response } from "express";

const SuccessStatus = {
    OK: 200,
    Created: 201,
    Accepted: 202,
};

const SuccessReason = {
    OK: "OK",
    Created: "Created",
    Accepted: "Accepted",
};

class SuccessResponse extends Error {
    code: number;
    status = "success";
    metadata?: Record<string, any>;
    constructor(message: string, code: number, metadata?: Record<string, any>) {
        super(message);
        this.code = code;
        this.metadata = metadata;
    }
    send(res: Response) {
        res.status(this.code).json({
            code: this.code,
            status: this.status,
            message: this.message,
            metadata: this.metadata,
        });
    }
}

export { SuccessReason, SuccessResponse, SuccessStatus };
