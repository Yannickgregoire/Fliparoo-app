import React, { Component } from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import CombinedReducers from './store/reducers';
import App from './components/App';

const store = createStore(CombinedReducers);

export default class Fliparoo extends Component {

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}