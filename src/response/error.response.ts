import { Response } from "express";

const ErrorStatus = {
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
};

const ErrorReason = {
    BadRequest: "Bad request",
    Unauthorized: "Unauthorized",
    PaymentRequired: "Payment required",
    Forbidden: "Forbidden",
    NotFound: "Not Found",
};

class ErrorResponse extends Error {
    code: number;
    status = "error";
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
    send(res: Response) {
        res.status(this.code).json({
            code: this.code,
            status: this.status,
            message: this.message,
        });
    }
}

export { ErrorReason, ErrorResponse, ErrorStatus };
