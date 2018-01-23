import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './App';
import './assets/css/index.css';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(rootReducer);

const Root = ({store}) => (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
