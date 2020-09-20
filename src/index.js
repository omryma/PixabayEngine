import React from 'react'
import { render } from 'react-dom'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { Provider } from 'react-redux';
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { GlobalStyles } from "./components/styled/globalStyles";

const store = configureStore({ reducer: rootReducer })

render(
    <Provider store={store}>
        <GlobalStyles />
        <BrowserRouter>
            <Route component={App}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);