import { applyMiddleware, createStore, combineReducers } from 'redux';

import contactsReducer from './contacts/reducer';
import { reducer as formReducer } from 'redux-form';

import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import saga from './saga';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    contacts: contactsReducer,
    form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk, thunkMiddleware, sagaMiddleware, logger));

sagaMiddleware.run(saga);

export default store;