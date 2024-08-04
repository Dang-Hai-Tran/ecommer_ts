import { Response } from "express";

const ErrorStatus = {
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
};

const ErrorReason = {
    BadRequest: "Bad request",
    Unauthorized: "Unauthorized",
    PaymentRequired: "Payment required",
    Forbidden: "Forbidden",
    NotFound: "Not Found",
    InternalServerError: "Internal Server Error",
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
