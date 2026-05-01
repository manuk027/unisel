        import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
    email: string;
    name: string;
    password?: string;
    avatar?: string;
    authProviders: ("local" | "google")[];
    googleId?: string;
    isVerified: boolean;
}

const userSchema: Schema<UserType> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    authProviders: {
        type: [String],
        enum: ['local', 'google'],
        default: ['local'],
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;