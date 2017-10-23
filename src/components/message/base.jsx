import React from 'react';

const baseMessage = (context,self) => {
    return (
        <div className={self ? 'chat-item chat-My': 'chat-item'}>
            <div className="chI-time"><span>10月16日 11:11:21</span></div>
            <div className={self ? 'My-context' : "chIndex-context" }>
                <div className="head-logo"><img src={require('../../img/robot.png')}/></div>
                <div className="">
                    <div className="item-name">{self ? '我' : 'IT小助手'}</div>
                    {context}
                </div>
            </div>
        </div>
    );
};

export default baseMessage;
