import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

const middlewares = [
    thunkMiddleware,
    process.env.NODE_ENV !== 'production' && logger
].filter(Boolean);

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);