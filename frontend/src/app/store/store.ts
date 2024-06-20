import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { backApi } from "../rtk";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import {
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { themeModeSlice } from "./slices/themeModeSlice";
import { userSlice } from "./slices/userSlice";

const persistConfig = {
	key: "root",
	storage,
    whitelist: ['themeMode', 'user'],
};

const reducersToPersist = combineReducers({
	themeMode: themeModeSlice.reducer,
    user: userSlice.reducer,
    [backApi.reducerPath]: backApi.reducer,
});

const persistedReducers = persistReducer(persistConfig, reducersToPersist);

export const store = configureStore({
	devTools: process.env.NODE_ENV !== "production",
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              }
        }).concat(backApi.middleware)
		
}); 


setupListeners(store.dispatch);

export const persistor = persistStore(store);
