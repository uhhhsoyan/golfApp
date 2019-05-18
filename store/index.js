import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
    reducers, // default reducers
    {}, // defult state
    compose(
        applyMiddleware(thunk) // middlewares
    )
)

export default store;
