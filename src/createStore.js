import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as dataReducer } from './components/data';

const middleware = [
  thunk
];

const rootReducer = combineReducers({
  data: dataReducer
});

export default () => createStore(rootReducer, applyMiddleware(...middleware));
