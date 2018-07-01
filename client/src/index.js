import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './ducks';
import App from './App';
import './assets/css/index.css';
import registerServiceWorker from './registerServiceWorker';


const loggerMiddleware = createLogger();

let store = createStore(rootReducer, 
    applyMiddleware(
        thunkMiddleware, /* lets us dispatch() functions */
        loggerMiddleware /* neat middleware that logs actions */
    )
);

const Root = ({store}) => (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
