import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer  from "../features/channelSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        app:appReducer ,
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
