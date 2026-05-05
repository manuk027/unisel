import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    id: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorzied: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        (req as any).user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token", });
    }
}