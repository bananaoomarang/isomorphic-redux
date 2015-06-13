import React    from 'react';
import AppFlux  from  '../shared/AppFlux';
import MainView from '../shared/views/index';

const flux = new AppFlux();

React.render(<MainView flux={flux} />, document.getElementById('react-view'));
