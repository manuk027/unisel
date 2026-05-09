import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CartState } from "./cartTypes";
import * as cartAPI from "./cartAPI";

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchCart = createAsyncThunk<any, void, { rejectValue: string }>("cart/fetchCart", async (_, thunkAPI) => {
    try {
        return await cartAPI.getCart();
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const addItemToCart = createAsyncThunk("cart/addItem", async (productId: string, thunkAPI) => {
    try {
        return await cartAPI.addToCart(productId);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const removeItemFromCart = createAsyncThunk("cart/removeItem", async (productId: string, thunkAPI) => {
    try {
        return await cartAPI.removeItem(productId);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const clearItemsFromCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
    try {
        return await cartAPI.clearCart();
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data.items;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong.";
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                console.log(action.payload);
                state.items = action.payload.data.items;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.items = action.payload.data.items;
            })
            .addCase(clearItemsFromCart.fulfilled, (state) => {
                state.items = [];
            })
    }
});

export default cartSlice.reducer;