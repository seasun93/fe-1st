import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    LOGIN_USER,
} from "./types";

export const loginUser = createAsyncThunk('login/loginUser', async (dataToSubmit) => {
    const res = await axios.post('/api/users/login', dataToSubmit);
    return {
        type : LOGIN_USER,
        result : res
    }
})

const userSlice = createSlice({
    name : 'login',
    initialState : {
        isLoggedIn : false,
        user : null,
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(loginUser.fulfilled, (state, action)=>{

            console.log(state)
            console.log(action.payload.result)
            const data = action.payload.result.data.loginSuccess
            
            // if(data.success){
            //     state.isLoggedIn = true;
            //     state.user = data.data;
            // }
            
        })
    }

})

export default userSlice.reducer;