import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState'; // initialState = feature2State

const feature1Reducer = createSlice({
  name: 'feature2',
  initialState,
  reducers: {
    retrievePosts: (state, action: PayloadAction<any>) =>
      retrievePostsReducer(state, action),
  },
});

function retrievePostsReducer(
  state: typeof initialState,
  action: PayloadAction<any>
) {
  state.posts = action.payload.posts;
  return state;
}

export const { reducer } = feature1Reducer;
export const { actions } = feature1Reducer;

export default feature1Reducer;
