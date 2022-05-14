import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const name: string = 'global';

const initialState = {
  lang: 'en'
}

export const globalSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLang: (state, { payload }) => ({
      ...state,
      lang: payload,
    }),
  },
});

export const globalActions = globalSlice.actions;
export const globalState = (state: RootState) => state.global;

export default globalSlice;
