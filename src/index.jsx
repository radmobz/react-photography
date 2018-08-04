import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';
import App from './components/App';
import userApp from './reducers';
import 'normalize.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

let store = createStore(userApp)

const theme = createMuiTheme({
  typography: {
    fontSize: '15px'
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
