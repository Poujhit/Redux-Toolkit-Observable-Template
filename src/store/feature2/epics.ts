import { AnyAction } from 'redux';
import { merge, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import axios from 'axios';

import { retrievePosts } from './actions';
// for connecting a epic to the action in the reducer.
import { actions } from './reducer';

const retrievePostsEpic = (
  action$: Observable<AnyAction>,
  _: any,
  { store }: any
) =>
  action$.pipe(
    filter(retrievePosts.match),
    mergeMap(async (action) => {
      console.log(action); // this action will contain payload from the dispatch
      let posts: Record<string, any>[] = [];
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        posts = response.data as Array<Record<string, any>>;
      } catch (error) {
        console.log(error);
      }
      return actions.retrievePosts({ posts });
    })
  );

const feature2Epics = (
  action$: Observable<AnyAction>,
  state$: any,
  dependency: any
): Observable<AnyAction> => {
  return merge(retrievePostsEpic(action$, state$, dependency));
};

export default feature2Epics;
