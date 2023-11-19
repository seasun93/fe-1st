import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from "../_reducers/authSlice";

const reducers = combineReducers({
    user : authSlice,
});

const persistConfig = {
    key: "root", // localStorage key 
    storage, // localStorage
    whitelist: ["user"], // target (reducer name)
}

const persistedReducer = persistReducer(persistConfig, reducers);



const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
    devTools: true,
});


export default store;