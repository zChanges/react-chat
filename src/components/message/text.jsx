import React from 'react';
import base from './base'

const textMessage = {
    shouldRender: messageType => messageType === 'text',
    render: (message,self) => {
        return base(
            <div className="item-context">{message}</div>,
            self
        );
    },
};

export default textMessage;
