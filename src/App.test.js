import React from 'react';
import App from './containers/GameContainer';
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";


const mockStore = configureMockStore();
const store = mockStore({});

it('renders without crashing', () => {
    shallow(
        <Provider store={store}>
            <App />
        </Provider>
    );
});
