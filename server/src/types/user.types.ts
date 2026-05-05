import { Types } from "mongoose";

export type AuthProvider = "local" | "google";

export type CreateUserDTO = {
    email: string;
    name: string;
    password?: string;
    avatar?: string;
    authProviders?: AuthProvider[];
    googleId?: string;
    isVerified?: boolean;
};

export type UpdateUserDTO = Partial<CreateUserDTO>;