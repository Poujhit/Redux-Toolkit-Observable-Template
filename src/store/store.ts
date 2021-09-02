import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import feature1Reducer from './feature1/reducer';
import feature2Reducer from './feature2/reducer';
import feature1Epics from './feature1/epics';
import feature2Epics from './feature2/epics';

const rootReducer = combineReducers({
  feature1: feature1Reducer.reducer, // now the feature1 key contains all reducers.
  feature2: feature2Reducer.reducer,
});

// make this type safe
const rootEpic = combineEpics(feature1Epics as any, feature2Epics as any);

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    // injecting the redux store object as a dependency.
    // using get because by this way i can access 'store object' before initialing it.
    // for get method see more here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#get_vs._defineproperty
    get store() {
      return store;
    },
  },
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    epicMiddleware,
  ],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>; // type of redux store

export default store;
