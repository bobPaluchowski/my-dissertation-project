/*
Author: Robert Paluchowski
Contact: rpaluchowski77@gmail.com
web: https://github.com/bobPaluchowski
Linkedin: https://www.linkedin.com/in/robert-paluchowski-16a370185/

*/

// -- React and related libs
import React from 'react';
import { render } from 'react-dom';
import "react-big-calendar/lib/css/react-big-calendar.css"

// -- Redux
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from 'react-redux';
import reducers from './reducers';

// -- App
import App from './App';

// -- Service Worker
import * as serviceWorker from './serviceWorker';

// -- Data Store
const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
);

// -- Rendering Application
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// To make this app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

