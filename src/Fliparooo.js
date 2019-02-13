import React, { Component } from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import CombinedReducers from './store/reducers';
import App from './components/App';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['trick']
}

const persistedReducer = persistReducer(persistConfig, CombinedReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

// purge cache for development
// persistor.purge();

export default class Fliparooo extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}