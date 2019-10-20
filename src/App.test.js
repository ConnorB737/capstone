import React from 'react';
import GameContainer from './containers/GameContainer';
import HomePageContainer from "./containers/HomePageContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import HelpContainer from "./containers/HelpContainer";
import DashboardContainer from "./containers/DashboardContainer";
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk, routerMiddleware(history)]);


it('renders Game without crashing', () => {
    const store = mockStore({
        main: {
            user: {
                login: "test@email.com",
            },
            scores: {},
            socket: {
                emit: jest.fn(),
            },
        },
    });
    mount(
        <Provider store={store}>
            <GameContainer />
        </Provider>
    );
});

it('renders Home page without crashing', () => {
    const store = mockStore({
        router: history,
        main: {},
    });
    mount(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <HomePageContainer />
            </ConnectedRouter>
        </Provider>
    );
});

it('renders Login page without crashing', () => {
    const store = mockStore({
        router: history,
        main: {},
    });
    mount(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <LoginContainer />
            </ConnectedRouter>
        </Provider>
    );
});

it('renders Register page without crashing', () => {
    const store = mockStore({
        router: history,
        main: {},
    });
    mount(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <RegisterContainer />
            </ConnectedRouter>
        </Provider>
    );
});

it('renders Help page without crashing', () => {
    const store = mockStore({
        router: history,
        main: {},
    });
    mount(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <HelpContainer />
            </ConnectedRouter>
        </Provider>
    );
});


it('renders Dashboard without crashing', () => {
    const store = mockStore({
        router: history,
        main: {
            openGames: [],
        },
    });
    mount(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <DashboardContainer />
            </ConnectedRouter>
        </Provider>
    );
});
