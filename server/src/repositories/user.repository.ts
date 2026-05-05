import User from "../model/userSchema.js";
import { CreateUserDTO, UpdateUserDTO } from "../types/user.types.js";

const findUserByEmail = (email: string) => {
    return User.findOne({ email });
}

const findUserByEmailWithPassword = (email: string) => {
    return User.findOne({ email }).select("+password");
}

const findUserByGoogleId = (googleId: string) => {
    return User.findOne({ googleId });
}

const findUserById = (id: string) => {
    return User.findById(id);
}

const createUser = (data: CreateUserDTO) => {
    return User.create(data);
};

const attachGoogleToUser = (userId: string, googleId: string, avatar?: string) => {
    return User.findByIdAndUpdate(
        userId,
        {
            $set: { googleId, avatar },
            $addToSet: { authProviders: "google" },
        },
        { new: true }
    );
};

const updateUserById = (id: string, data: UpdateUserDTO) => {
    return User.findByIdAndUpdate(id, data, { new: true });
}

export { findUserByEmail, findUserByEmailWithPassword, findUserByGoogleId, findUserById, createUser, attachGoogleToUser, updateUserById}