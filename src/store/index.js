import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../_reducers/authSlice";
import userSlice from '../_reducers/userSlice';

export const store = configureStore({
    reducer : {
        user : userSlice,
        auth : authSlice
    },
})