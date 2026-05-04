import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    (req as any).user = { id: "000000000000000000000001" };
    next();
}