require('fetch-ie8');
require('font-awesome-webpack');
const React = require('react');
const render = require('react-dom').render;
const Provider = require('react-redux').Provider;
const configureStore = require('./store/configureStore');

// Style
require('font-awesome/css/font-awesome.min.css');
require('./style/chat.css');
require('./style/common.scss');
// require('bootstrap-sass');



const Chat = require('./components/chat');
const store = configureStore()


render(
  <Provider store={store}>
    <Chat />
  </Provider>,
  document.getElementById('app')
)
