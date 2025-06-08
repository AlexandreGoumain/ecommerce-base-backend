import { NextFunction, Request, Response } from "express";

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);

    if (err instanceof AuthenticationError) {
        res.status(401).json({ message: `Not authorized : ${err.message}` });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
    }
}

export { AuthenticationError, errorHandler };
