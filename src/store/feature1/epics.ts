import { AnyAction } from 'redux';
import { merge, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import axios from 'axios';

import { retrieveUsers } from './actions';
// for connecting a epic to the action in the reducer.
import { actions } from './reducers';

const retrieveUsersEpic = (
  action$: Observable<AnyAction>,
  _: any,
  { store }: any
) =>
  action$.pipe(
    filter(retrieveUsers.match),
    mergeMap(async (action) => {
      console.log(action); // this action will contain payload from the dispatch
      let users: Record<string, any>[] = [];
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        users = response.data as Array<Record<string, any>>;
      } catch (error) {
        console.log(error);
      }
      // just dispatching a random action using the store dependency
      store.dispatch(actions.increment(1));
      return actions.retrieveUsers({ users });
    })
  );

const feature1Epics = (
  action$: Observable<AnyAction>,
  state$: any,
  dependency: any // here you can pass any value that will be injected to all epics.
  //for example you can inject the redux store to access redux store object inside the epic.
  // you can dispatch another action inside epic using the store object.
): Observable<AnyAction> => {
  return merge(retrieveUsersEpic(action$, state$, dependency));
};

export default feature1Epics;
