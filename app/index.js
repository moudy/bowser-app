require('babel-polyfill');
import 'normalize.css/normalize.css';
import './css/global.css';

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';

// TODO = Move this into index.html template
const main = document.createElement('main');
document.body.appendChild(main);

ReactDOM.render(
    <h1>Hello, world!</h1>,
    main
);
