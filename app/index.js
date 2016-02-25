require('babel-polyfill');
import 'normalize.css/normalize.css';
import './css/global.css';

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';

import App from 'app/components/App';

// TODO = Move this into index.html template
const main = document.createElement('main');
document.body.appendChild(main);

const url = document.location.hash.substr(1);

ReactDOM.render(<App url={url} />, main);

