// @flow

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { middleware } from './navigator';
import reducer from './reducers';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware, middleware),
);

const persistor = persistStore(store);

sagaMiddleware.run(saga);

export {
  persistor,
  store,
};
