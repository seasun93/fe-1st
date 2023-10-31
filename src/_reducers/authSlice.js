import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH } from './types';

export const auth = createAsyncThunk('user/auth', async () => {
    const res = await axios.get('/api/users/auth');
    return {
        type : AUTH,
        result : res.data,
    };
})

const authSlice = createSlice({
    name : 'user',
    initialState : {
        isLoggedIn : false,
        user : null,
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(auth.fulfilled, (state, action)=>{
            const data = action.payload.result;
            if(data.loginSuccess){
                state.isLoggedIn = true;
                state.user = data.data;
            }
            
        })
    }

})

export default authSlice.reducer;