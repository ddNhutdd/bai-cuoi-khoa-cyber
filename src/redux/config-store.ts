import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from './slices/user.slice'
import  catalogReducer  from './slices/catalog.slice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        catalog: catalogReducer
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
