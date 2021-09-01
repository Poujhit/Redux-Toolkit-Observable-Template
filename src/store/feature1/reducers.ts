import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './intialState'; // initialState = feature1State

const feature1Reducer = createSlice({
  name: 'feature1',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) =>
      incrementReducer(state, action),
    retrieveUsers: (state, action: PayloadAction<any>) =>
      retrieveUsersReducer(state, action),
  },
});

function incrementReducer(
  state: typeof initialState,
  action: PayloadAction<number>
) {
  // action is the payload that is given in dispatch like dispatch(increment({number:12}))
  // {number:12} is the action.
  state.num = state.num + 1;
  return state;
}

function retrieveUsersReducer(
  state: typeof initialState,
  action: PayloadAction<any>
) {
  state.users = action.payload.users;
  return state;
}

export const { reducer } = feature1Reducer;
export const { actions } = feature1Reducer;

export default feature1Reducer;
