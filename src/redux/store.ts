import logger from 'redux-logger';
import { Action, combineReducers, configureStore, MiddlewareArray, ThunkAction } from '@reduxjs/toolkit';

import global from './slices/global';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) => {
  const middlewares: MiddlewareArray<any> = getDefaultMiddleware();

  if (process.env.NODE_ENV !== 'production') {
    middlewares.concat(logger);
  }

  return middlewares;
};


const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: middleware,
  reducer: combineReducers(
    {
      global: global.reducer,
      // user: user.reducer,
    }
  )
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
