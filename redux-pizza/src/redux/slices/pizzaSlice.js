import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {sortBy , order, category, search} = params;
    const { data } = await axios.get(
        `https://6358e229c27556d28945ce93.mockapi.io/story?${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
}); 

const initialState = {
   items: [],
   status: 'loading',
};

const pizzaSlice = createSlice({
     name: 'pizza',
     initialState,
     reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
     },
     extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        },
     },
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;