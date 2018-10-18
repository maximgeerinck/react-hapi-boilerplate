import React, { Component } from 'react';
import { Provider } from 'react-redux';
import setupApp from './app/configureStore';
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./app/Components/Loader";

import App from './app/app/App';

const setup = setupApp();

const Root = () => {

  return (
    <Provider store={setup.store}>
      <PersistGate loading={<Loader />} persistor={setup.persistor}>
        <App />
      </PersistGate>
    </Provider>
  );

}


export default Root