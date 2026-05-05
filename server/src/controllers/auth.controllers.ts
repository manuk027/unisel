import User from "../model/userSchema.js";
import { NextFunction, Request, Response } from 'express'
import { register, login, googleAuth } from "../services/auth.service.js";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await register(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await login(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const googleAuthUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await googleAuth(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
}

export { registerUser, loginUser, googleAuthUser };