import { UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import commonReducer from '../features/common/commonSlice';
const combinedReducers = combineReducers({
  common: commonReducer
});
const rootReducer = (state: any, action: UnknownAction) => {
  return combinedReducers(state, action);
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
