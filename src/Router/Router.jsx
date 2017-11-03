import React, {Component} from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom'
import Login from '../components/login';
import Chat from '../components/chat';



const RouteConfig = (
    <HashRouter>
        <div>
            <Route path="/" component={Login}/>
            <Route path="/Chat" component={Chat}/>
        </div>
    </HashRouter>
);

export default RouteConfig;