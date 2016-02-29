require('babel-polyfill');
import 'normalize.css/normalize.css';
import './css/global.css';

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';

import App from 'app/components/App';
import Foyer from 'app/components/Foyer';

// TODO = Move this into index.html template
const link = document.createElement('link');
link.rel = 'chrome-webstore-item';
link.href = 'https://chrome.google.com/webstore/detail/ehifphmcdbhocdmdadjefoodhdapgnid';
document.head.appendChild(link);

const main = document.createElement('main');
document.body.appendChild(main);

const url = document.location.hash.substr(1);

if (url) {
  ReactDOM.render(<App url={url} />, main);
} else {
  ReactDOM.render(<Foyer />, main);
}

