import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'shared/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'modules';

const store = createStore(reducers, applyMiddleware(thunk));

const Root = () => { 
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}

export default Root;