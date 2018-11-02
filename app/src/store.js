// @flow

import Reactotron from './ReactotronConfig';
import { applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
// $FlowFixMe flox-typed don't know redux-persist yet.
import storage from 'redux-persist/lib/storage';
import reducer from './reducers';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = Reactotron.createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware),
);

const persistor = persistStore(store);

sagaMiddleware.run(saga);

export {
  persistor,
  store,
};
