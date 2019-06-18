import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import WebFont from 'webfontloader'; 
WebFont.load({ google: { families: ['Material Icons'] } });
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
