import React, { Component } from "react";
import { Col, Tabs, Tab, Row, Nav, NavItem } from "react-bootstrap";
import MessageList from "./Message";
import InputBox from "./inputBox";
import textMessage from "./Message/text";
import MessItem from "./Message/text";
import iScroll from "iscroll";
import ReactIScroll from "react-iscroll";
import client from '../clinet';

export default class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messageList: [],
      iScrollOptions: {
        mouseWheel: true,
        scrollbars: true,
        scrollX: false,
        scrollY: true
      },
      scrollTop: 0,
      placeholder: "你可以尝试输入类似'美信登陆不成功'、'mip显示异常' 等问题。"
    };
    
    client.init('aa')
    
  }

  sendClick = value => {
    var messages = { message: value, self: true };
    var templ = [...this.state.messageList];
    templ.push(messages);
    this.setState({
      messageList: templ
    });

    client.sendMsg({
        msg: value,
        toUser: 'bbb',
    });

    this.refs.iScroll.withIScroll(iScroll => {
      iScroll.scrollTo(0, Number(-this.state.scrollTop));
    });
    // console.log(this.dom);
    // const doms = <MessItem/>
    // this.dom.appendChild(doms);
  };

  _handleScrollRefresh = iScrollInstance => {
    this.setState({
      scrollTop: iScrollInstance.scrollerHeight
    });
  };

  render() {
    const { messageList, iScrollOptions, placeholder } = this.state;
    return (
      <Tab.Container id="chat" defaultActiveKey="first" sm={8}>
        <Row className="clearfix">
          <Col sm={12}>
            <Nav bsStyle="tabs">
              <NavItem eventKey="first">Tab 1</NavItem>
              <NavItem eventKey="second">Tab 2</NavItem>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="first">
                <div id="client">
                  <div id="chat-client">
                    <ReactIScroll
                      ref="iScroll"
                      iScroll={iScroll}
                      options={iScrollOptions}
                      onRefresh={this._handleScrollRefresh}
                    >
                      <div style={{ padding: 20 }}>
                        <MessItem messageList={messageList} />
                      </div>
                    </ReactIScroll>
                  </div>
                  <div className="chat-operation">
                    <i className="fa fa-smile-o" aria-hidden="true" />
                    <i className="fa fa-scissors" aria-hidden="true" />
                    <i className="fa fa-folder-o" aria-hidden="true" />
                  </div>

                  <InputBox
                    placeholder={placeholder}
                    handSendVal={this.sendClick}
                  />
                  <div className="chat-hint">
                    机器人无法解决？<a>转人工服务</a>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}
module.exports = Chat;
