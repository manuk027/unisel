import { attachGoogleToUser, createUser, findUserByEmail, findUserByEmailWithPassword, findUserByGoogleId } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { normalizeEmail, validateName, validatePassword } from "../utils/validator.js";

const register = async (data: { email: string, name: string, password: string }) => {
    const email = normalizeEmail(data.email);
    const name = validateName(data.name);
    const password = validatePassword(data.password);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        if (!existingUser.authProviders.includes("local")) {
            throw new Error("Account exists with Google. Please Login using Google.")
        }
        throw new Error("User already exists.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, name, password: hashedPassword, authProviders: ["local"] });
    const token = generateToken({ id: user._id });
    return { token, user: { id: user._id, email: user.email, name: user.name } };
};

const login = async (data: { email: string, password: string }) => {
    const email = normalizeEmail(data.email);
    const password = data.password.trim();
    if (!password) {
        throw new Error("Password is required.");
    }
    const user = await findUserByEmailWithPassword(email);
    if (!user || !user.password) {
        throw new Error("Invalid Credentials.");
    }
    if (!user.authProviders.includes("local")) {
        throw new Error("Please login using google.");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }
    const token = generateToken({ id: user._id });
    return { token, user: { id: user._id, email: user.email, name: user.name } };
};

const googleAuth = async (data: { email: string, name: string, googleId: string, avatar: string }) => {
    const email = normalizeEmail(data.email);
    const name = data.name.trim();
    const googleId = data.googleId?.trim();
    const avatar = data.avatar;
    if (!googleId) {
        throw new Error("Invalid Google Data.");
    }
    let user = await findUserByGoogleId(googleId);
    if (user) {
        const token = generateToken({ id: user._id });
        return { token, user: { id: user._id, email: user.email, name: user.name } };
    }
    user = await findUserByEmail(email);
    if (user) {
        if (!user.authProviders.includes("google")) {
            user = await attachGoogleToUser(user._id.toString(), googleId, avatar);
        }
    } else {
        user = await createUser({ email, name, googleId, avatar, authProviders: ["google"] });
    }
    if (!user) {
        throw new Error("User creation/linking failed.");
    }
    const token = generateToken({ id: user._id });
    return { token, user: { id: user._id, email: user.email, name: user.name } }
}

export { register, login, googleAuth };