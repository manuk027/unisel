import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: string;
}


export const generateToken = (payload: JwtPayload) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}