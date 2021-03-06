import React, { Component, PropTypes } from 'react';

class Message extends Component {
    static propTypes = {
        self: PropTypes.bool,
        context: PropTypes.string
    }
    render() {
        const { self,  context } = this.props;
        console.log(self, context)
        return (
            <div>
                <div className={self ? 'chat-item chat-My': 'chat-item'}>
                    <div className="chI-time"><span>10月16日 11:11:21</span></div>
                    <div className={self ? 'My-context' : "chIndex-context" }>
                        <div className="head-logo"><img src={require('../img/robot.png')}/></div>
                        <div className="">
                            <div className="item-name">{self ? '我' : 'IT小助手'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;