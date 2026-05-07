import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    googleLoginAPI,
    loginUserAPI,
    registerUserAPI,
} from "./authAPI";

import { type AuthState } from "./authTypes";

const initialState: AuthState = {
    user: JSON.parse(
        localStorage.getItem("user") || "null"
    ),

    token: localStorage.getItem("token"),

    loading: false,

    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (
        data: {
            email: string;
            password: string;
        },
        thunkAPI
    ) => {
        try {
            return await loginUserAPI(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",

    async (
        data: {
            name: string;
            email: string;
            password: string;
        },
        thunkAPI
    ) => {
        try {
            return await registerUserAPI(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }
);

export const googleLogin = createAsyncThunk(
    "auth/googleLogin",

    async (
        data: {
            email: string;
            name: string;
            googleId: string;
            avatar: string;
        },
        thunkAPI
    ) => {
        try {
            return await googleLoginAPI(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Google Login Failed."
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;

            state.token = null;

            state.error = null;

            state.loading = false;

            localStorage.removeItem("token");

            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        // LOGIN
        builder.addCase(
            loginUser.pending,
            (state) => {
                state.loading = true;

                state.error = null;
            }
        );

        builder.addCase(
            loginUser.fulfilled,
            (state, action) => {
                state.loading = false;

                state.user =
                    action.payload.data.user;

                state.token =
                    action.payload.data.token;

                localStorage.setItem(
                    "token",
                    action.payload.data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        action.payload.data.user
                    )
                );
            }
        );

        builder.addCase(
            loginUser.rejected,
            (state, action) => {
                state.loading = false;

                state.error =
                    action.payload as string;
            }
        );

        // REGISTER
        builder.addCase(
            registerUser.pending,
            (state) => {
                state.loading = true;

                state.error = null;
            }
        );

        builder.addCase(
            registerUser.fulfilled,
            (state, action) => {
                state.loading = false;

                state.user =
                    action.payload.data.user;

                state.token =
                    action.payload.data.token;

                localStorage.setItem(
                    "token",
                    action.payload.data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        action.payload.data.user
                    )
                );
            }
        );

        builder.addCase(
            registerUser.rejected,
            (state, action) => {
                state.loading = false;

                state.error =
                    action.payload as string;
            }
        );

        // GOOGLE LOGIN
        builder.addCase(
            googleLogin.pending,
            (state) => {
                state.loading = true;

                state.error = null;
            }
        );

        builder.addCase(
            googleLogin.fulfilled,
            (state, action) => {
                state.loading = false;

                state.user =
                    action.payload.data.user;

                state.token =
                    action.payload.data.token;

                localStorage.setItem(
                    "token",
                    action.payload.data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        action.payload.data.user
                    )
                );
            }
        );

        builder.addCase(
            googleLogin.rejected,
            (state, action) => {
                state.loading = false;

                state.error =
                    action.payload as string;
            }
        );
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;