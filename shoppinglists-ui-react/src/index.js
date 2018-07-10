import React from 'react';
import ReactDOM from 'react-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import '/node_modules/bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
