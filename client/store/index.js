import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import users from './users';
import albums from './albums';
import photos from './photos';

const reducers = combineReducers({ users, albums, photos });
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

export default store;
export * from './users';
export * from './albums';
export * from './photos';
