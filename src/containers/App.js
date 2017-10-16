import React, { Component, PropTypes } from 'react';
import Chat from '../components/Chat';

class App extends Component{
    render(){
        const {todos, actions} = this.props;
        return (
            <div>
                <Chat/>
            </div>
        );
    }
}


module.exports = App
