import store from './api/indexApi';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
