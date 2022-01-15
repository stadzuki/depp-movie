import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import AppRouting from "./AppRouting";
import store from "./store";
import {Provider} from "react-redux";
import AppLoading from "./AppLoading";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <AppLoading/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
