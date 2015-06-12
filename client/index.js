var React    = require('react');
var AppFlux  = require('../shared/AppFlux')
var MainView = require('../shared/views/index.jsx');

var flux = new AppFlux();

React.render(React.createElement(MainView, { flux: flux }), document.getElementById('react-view'));
