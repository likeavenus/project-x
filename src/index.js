import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './style.module';
// eslint-disable-next-line no-unused-vars
import firebase from './api';

if (module.hot) {
    module.hot.accept();
}

render(<App />, document.getElementById('root'))
