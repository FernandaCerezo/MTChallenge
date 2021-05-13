import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { AppRouter } from './src/AppRouter';
import reducers from './src/reducers';
import { configureAmplify } from './src/aws-config';

const middlewares = [ReduxThunk];

configureAmplify();

export default () => (
  <Provider store={createStore(reducers, {}, applyMiddleware(...middlewares))}>
    <AppRouter />
  </Provider>
);
