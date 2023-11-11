import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    GET_LIST
} from './types';

export const getList = createAsyncThunk('post/getList', async (type) => {
    const params = useParams();
    const page = params.page

    const res = await axios.get(`/api/${type}/list/${page}`);
    return {
        type : GET_LIST,
        result : res.data,
    };
})


const boardListSlice = createSlice({
    name : 'post',
    initialState : {
        list : [],
    },
    reducers : {
    },
    extraReducers : (builder)=>{
        builder.addCase(getList.fulfilled, (state, action)=>{
            const data = action.payload;
            console.log(data)
            state.list = data.data;
            
        })
    }

})

// export const { logout, edit } = boardListSlice.actions;
export default boardListSlice.reducer;
