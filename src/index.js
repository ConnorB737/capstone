import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import openSocket from "socket.io-client";
import { dispatchFromSocket } from "./Api";
import GameContainer from "./containers/GameContainer";
import './index.css';
import config from './config';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Link } from "react-router-dom";
import HomePageContainer from "./containers/HomePageContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import DashboardContainer from "./containers/DashboardContainer";
import HelpContainer from "./components/HelpContainer"
const socket = openSocket(config['{process.env.NODE_ENV}'], {transports: ['websocket', 'polling']});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const store = createStore(
    // history
    createRootReducer(history),
    {
        main: {
            socket,
            openGames: [],
            joinedGames: [],
            readyGames: [],
		    serverBoard: null,
            scores: [],
            user: null,
            rack: null,
            tiles_left: null,
            history:[],
        },
    },
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))),
);
dispatchFromSocket(store);

render(
  <Provider store={store}>

      <ConnectedRouter history={history}>
          <Switch>
              <Route exact path="/">
                  <HomePageContainer />
              </Route>
              <Route  path="/login">
                  <LoginContainer />
              </Route>
              <Route  path="/register">
                  <RegisterContainer />
              </Route>
              <Route exact path="/Help">
                  <HelpContainer />
              </Route>
              <Route exact path="/dashboard">
                  <DashboardContainer />
              </Route>
              <Route exact path="/game/:gameId">
                  <GameContainer />
              </Route>
          </Switch>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

