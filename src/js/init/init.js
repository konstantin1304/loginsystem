'use strict';
import React from 'react';
import { render } from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import configCore from '../config/config';
import RootModule from '../modules/RootModule/RootModule.jsx';
import reducer from '../roots/rootReducers.js';
import rootSaga from '../roots/rootSaga.js'; // TODO uncomment to work with SAGA
import { Provider } from "react-redux";

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    document.title = configCore.title;
    setFavIcon(configCore.favIcon);
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);

    render(
        <Provider store={store}>
            <RootModule/>
        </Provider>
            , document.getElementById('root'));
            }

            export function setFavIcon(src) {
            if (!src) {
            return false;
        }

            const favicon = document.createElement('link');

            favicon.rel = 'icon';
            favicon.href = src;
            document.head.appendChild(favicon);
        }
