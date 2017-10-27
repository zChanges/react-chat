import React,{Component} from 'react';


const baseMessage = (textContext,self,key) => {
    return (
        <div key={key} className={self ? 'chat-item chat-My': 'chat-item'}>
            <div className="chI-time"><span>10月16日 11:11:21</span></div>
            <div className={self ? 'My-context' : "chIndex-context" }>
                <div className="head-logo"><img src={require('../../img/robot.png')}/></div>
                <div className="">
                    <div className="item-name">{self ? '我' : 'IT小助手'}</div>
                   {textContext}
                </div>
            </div>
        </div>
    );
};

export default baseMessage;