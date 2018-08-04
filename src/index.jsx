import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { hydrate } from 'react-dom';
import App from './components/App';
import userApp from './reducers';
import 'normalize.css';

let store = createStore(userApp)

hydrate(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('app')
);
