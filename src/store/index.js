import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../_reducers/userSlice';

export const store = configureStore({
    reducer : {
        user : userSlice,
    },
})