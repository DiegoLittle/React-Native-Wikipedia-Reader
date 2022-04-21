import { applyMiddleware, createStore } from 'redux';
import * as thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import MMKVStorage from "react-native-mmkv-storage";
const storage = new MMKVStorage.Loader().initialize();

import reducers from '../reducers';


const persistConfig = {
  key: 'root',
  storage,
};
/**
 * Custom middle ware implementations
 */
// import { logger } from '../middlewares/logger';

let middlewares = [thunkMiddleware.default];
if (__DEV__) {
  const logger = require('redux-logger');
  const loggerMiddleware = logger.createLogger({
    duration: true,
  });
  middlewares = [...middlewares, loggerMiddleware];
}
const persistedReducer = persistReducer(persistConfig, reducers)


const store = createStore(persistedReducer, applyMiddleware(...middlewares));
let persistor = persistStore(store)
/**
 * Add custom middlewares
 * They are executed in the order they are registered here
 */
// const store = createStore(reducers, applyMiddleware(...middlewares, logger));

export type AppDispatch = typeof store.dispatch;

export default {store,persistor};
