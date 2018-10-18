import React from "react";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import immutableTransform from 'redux-persist-transform-immutable'
import { Provider } from "react-redux";
import rootReducer, { records } from "./rootReducer";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import autoMergeLevel2Immutable from "./test";

const persistConfig = {
    transforms: [immutableTransform({ records })],
    key: 'root',
    storage
}

const logger = createLogger();
const enhancer = compose(applyMiddleware(thunk, logger));
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    enhancer
);

export default () => {
    const persistor = persistStore(store, {
        transforms: [immutableTransform({ records })],
    })
    return { store, persistor }
}