const normalizeEmail = (email: string): string => {
    if (typeof email !== "string") {
        throw new Error("Invalid email.");
    }
    const value = email.trim().toLowerCase();
    if (!value) {
        throw new Error("Email is required.");
    }
    if (value.length > 254) {
        throw new Error("Email is too long.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        throw new Error("Invalid email format.");
    }
    return value;
};

const validateName = (name: string): string => {
    if (typeof name !== "string") {
        throw new Error("Invalid name.");
    }
    const value = name.trim();
    if (!value) {
        throw new Error("Name is required.");
    }
    if (value.length < 2 || value.length > 30) {
        throw new Error("Name must be between 2 and 30 characters.");
    }
    const nameRegex = /^[A-Za-z\s.'-]+$/;
    if (!nameRegex.test(value)) {
        throw new Error("Name contains invalid characters.");
    }
    return value;
};

const validatePassword = (password: string): string => {
    if (typeof password !== "string") {
        throw new Error("Invalid password.");
    }
    const value = password.trim();
    if (!value) {
        throw new Error("Password is required.");
    }
    if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }
    if (value.length > 128) {
        throw new Error("Password is too long.");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
    if (!passwordRegex.test(value)) {
        throw new Error(
            "Password must include uppercase, lowercase, number, and special character."
        );
    }
    return value;
};

export { normalizeEmail, validateName, validatePassword };