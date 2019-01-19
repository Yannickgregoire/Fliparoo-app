import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import CombinedReducers from './store/reducers';
import App from './components/App';

const store = createStore(CombinedReducers);

export default class Fliparoo extends Component {

    render() {
        return (
            <Provider store={store}>
                <StatusBar
                    barStyle="light-content"
                />
                <App />
            </Provider>
        );
    }
}