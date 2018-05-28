import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import users from './users';
import albums from './albums';
import photos from './photos';
import user from './sessions';
import people from './people';

import { signUp, getUserFromToken } from './sessions';
import { addUser, saveUser } from './users';
// import { addPerson, savePerson } from './people';


const reducers = combineReducers({ users, user, albums, photos, people });
const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

export const signUpAddUser = (userInfo, history) => {
  return dispatch => {
    return dispatch(signUp(userInfo, history))
      .then(user => dispatch(addUser(user)))
      .then(() => history.push('/'));
  };
};

export const passwordReset = (userInfo, history) => {
  return dispatch => {
    return dispatch(saveUser(userInfo, history))
      .then(() => {
        const token = window.localStorage.getItem('token');
        dispatch(getUserFromToken(token));
      });
  };
};

export default store;
export * from './users';
export * from './albums';
export * from './photos';
export * from './sessions';
export * from './people';
