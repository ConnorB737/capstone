import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import * as serviceWorker from './serviceWorker';
import openSocket from "socket.io-client";
import { dispatchFromSocket } from "./Api";
import App from "./App";
import './index.css';

const socket = openSocket('http://localhost:5000');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    {
        socket,
        games: [],
		serverBoard: "yo",
    },
    composeEnhancers(applyMiddleware(thunk)),
);

dispatchFromSocket(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
