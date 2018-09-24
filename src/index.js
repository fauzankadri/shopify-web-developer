import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

import './index.css';

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))} >
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={App} exact />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);