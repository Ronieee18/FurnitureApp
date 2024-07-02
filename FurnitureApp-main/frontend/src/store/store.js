import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { loadState,saveState } from "./localStorage";
const persistedState = loadState();
export const store=configureStore({
    reducer:{
        auth:authSlice,
    },
    preloadedState:persistedState,
});

store.subscribe(()=>{
    saveState(store.getState());
})