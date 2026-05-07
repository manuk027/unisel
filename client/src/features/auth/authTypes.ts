export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}