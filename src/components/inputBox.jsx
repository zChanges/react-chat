import React, { Component, PropTypes } from 'react';
class InputBox extends Component{

    static PropTypes = {
        placeholder: PropTypes.string,
    }

    // 回车send
    handleInputKeyDpwnSend = (e) =>{
        if(e.keyCode === 9){
            e.preventDefault();
            return;
        }
        if(e.keyCode === 13){
            e.preventDefault();
            const message = this.input.value;
            if(message.trim() === ''){
                return
            }
            this.send(message);
        }
    }

    //点击send
    handleInputClickSend = () => {
        const message = this.input.value;
        this.send(message);
    }

    send = () => {
        this.props.handSendVal(this.input.value);
        console.log(this.input.value)
        this.input.value = '';
    }

    render(){
        const { placeholder } = this.props
        return (
            <div className="client-bootom">
                {/* "你可以尝试输入类似'美信登陆不成功'、'mip显示异常' 等问题。" */}
                <textarea 
                    placeholder={ placeholder }
                    ref={input => this.input = input}
                    onKeyDown={this.handleInputKeyDpwnSend}
                ></textarea>
                <button 
                    className="bootom-btn pull-right btn-send" 
                    onClick={this.handleInputClickSend}
                >发送</button>
                <button className="bootom-btn pull-right btn-out">退出人工服务</button>
            </div> 
        )
    }

}

module.exports = InputBox;