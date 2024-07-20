import { NextFunction, Request } from "express";

const asyncHandler = (fn: Function) => {
    return (req: Request, res: Request, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default asyncHandler;
