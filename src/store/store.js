import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index';

const middleware = [thunk];
const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        devTools
    )
);

export default store;