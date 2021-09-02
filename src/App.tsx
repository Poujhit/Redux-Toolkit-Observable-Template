import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { actions } from 'store/feature1/reducer';
import { retrieveUsers } from 'store/feature1/actions';
import { retrievePosts } from 'store/feature2/actions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const count = useSelector((state: RootState) => state.feature1.num);
  const users = useSelector((state: RootState) => state.feature1.users);
  const posts = useSelector((state: RootState) => state.feature2.posts);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>React Redux Toolkit Redux Observable Template</p>
        <p>
          <button
            type='button'
            onClick={() => {
              dispatch(actions.increment(1));
            }}
          >
            count is: {count}
          </button>
        </p>
        <button
          type='button'
          onClick={() => {
            dispatch(retrieveUsers({ hello: 'hello' }));
          }}
        >
          Click to get the users and increment counter after that
        </button>

        <p>{JSON.stringify(users)}</p>
        <button
          type='button'
          onClick={() => {
            dispatch(retrievePosts({ hello: 'hello' }));
          }}
        >
          Click to get the posts
        </button>
        <p>{JSON.stringify(posts)}</p>
      </header>
    </div>
  );
};

export default App;
