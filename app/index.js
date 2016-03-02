require('babel-polyfill');
import 'normalize.css/normalize.css';
import './css/global.css';

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from 'app/components/App';
import Foyer from 'app/components/Foyer';
import reducers from 'app/reducers';
import {Graph} from 'graphlib';

const url = document.location.hash.substr(1);
const main = document.getElementsByTagName('main')[0];

const app = () => {
  if (!url) return <Foyer/>;
  const graph = new Graph();
  graph.setNode(`0:${url}`, {url});

  const state = {
    graph,
    root: url,
    currentUrl: url,
    currentPageGroup: 0,
  };
  const store = createStore(reducers, state);
  return <Provider store={store}><App/></Provider>;
};

ReactDOM.render(app(), main);
