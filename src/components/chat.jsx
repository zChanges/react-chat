import React,{Component} from 'react';
import {Col, Tabs, Tab, Row, Nav, NavItem} from "react-bootstrap";
import MessageList from './Message';
export default class Chat extends Component{

    constructor(props,context){
        super(props,context);
        this.state ={
            text : '111'
        };
    }

    handelChange(e){
        console.log(e)
    }

    handelClick(){
        this.setState({
            text : ''
        });
    }

    sendClick(e) {
        console.log(e)
    }

    render(){
        const {addTodo} = this.props;
        return (
            <Tab.Container id='chat' defaultActiveKey="first" sm={8}>
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="tabs">
                  <NavItem eventKey="first">
                    Tab 1
                  </NavItem>
                  <NavItem eventKey="second">
                    Tab 2
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="first">
                      <div id="client">
                        <div id="chat-client">
                            <MessageList self={false} context={'欢迎'}/>
                            <MessageList self={true} context={'aaa'}/>
                        </div>
                        <div className="chat-operation">
                            <i className="fa fa-smile-o" aria-hidden="true"></i>
                            <i className="fa fa-scissors" aria-hidden="true"></i>
                            <i className="fa fa-folder-o" aria-hidden="true"></i> 
                        </div>

                        <div className="client-bootom">
                            <textarea placeholder="你可以尝试输入类似'美信登陆不成功'、'mip显示异常' 等问题。"></textarea>
                            <button className="bootom-btn pull-right btn-send" onClick={this.sendClick}>发送</button>
                            <button className="bootom-btn pull-right btn-out">退出人工服务</button>
                        </div>
                        <div className="chat-hint">机器人无法解决？<a>转人工服务</a></div>
                      </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    Tab 2 content
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
            // <div id='chat' className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            //     <div id="chat-context" className="pull-left col-xs-9 col-sm-9 col-md-9 col-lg-9">
            //         <ul className="nav nav-tabs" role="tablist">
            //             <li role="presentation" className="active" style={{marginLeft: 15}}><a href="#client" aria-controls="client" role="tab" data-toggle="tab">在线客户</a></li>
            //             <li role="presentation"><a href="#accounting" aria-controls="accounting" role="tab" data-toggle="tab">自助报账</a></li>
            //         </ul>
                
            //         <div className="tab-content">
            //             <div role="tabpanel" className="tab-pane active" id="client">
            //                 <div id="chat-client">
            //                         <div className="chat-item">
            //                             <div className="chI-time"><span>10月16日 11:11:21</span></div>
            //                             <div className="chIndex-context">
            //                                 <div className="head-logo"><img src={require('../img/robot.png')}/></div>
            //                                 <div className="">
            //                                     <div className="item-name">IT小助手</div>
            //                                     <div className="item-context">很高兴为您服务，请问有什么能帮助到你的么？</div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div className="chat-item chat-My">
            //                             <div className="chI-time"><span>10月16日 11:11:21</span></div>
            //                             <div className="My-context">
            //                                 <div className="head-logo"><img src={require('../img/robot.png')}/></div>
            //                                 <div className="">
            //                                     <div className="item-name">我</div>
            //                                     <div className="item-context">很高兴为您服务，请问有什么能帮助到你的么？</div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                 </div>

            //                 <div className="chat-operation">
            //                     <i className="fa fa-smile-o" aria-hidden="true"></i>
            //                     <i className="fa fa-scissors" aria-hidden="true"></i>
            //                     <i className="fa fa-folder-o" aria-hidden="true"></i> 
            //                 </div>

            //                 <div className="client-bootom">
            //                     <textarea placeholder="你可以尝试输入类似'美信登陆不成功'、'mip显示异常' 等问题。"></textarea>
            //                     <button className="bootom-btn pull-right btn-send">发送</button>
            //                     <button className="bootom-btn pull-right btn-out">退出人工服务</button>
            //                 </div>
                            
            //                 <div className="chat-hint">机器人无法解决？<a>转人工服务</a></div>
            //             </div>
            //             <div role="tabpanel" className="tab-pane" id="accounting">...</div>
            //         </div>
            //     </div>

            //     <div id="chat-menu pull-right" className="pull-right col-xs-3 col-sm-3 col-md-3 col-lg-3">
            //         <div className="serviceOrder">

            //             <div className="serviceO-title">
            //                 <div className="">最近服务单</div>
            //                 <div className="serviceO-page">
            //                     <span className="pageNum">1/4</span>
            //                     <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
            //                     <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
            //                 </div>
            //             </div>

            //             <div className="serviceO-Context">
            //                 <div className="serviceOC-titl">
            //                     <div>单号:<b>123456789</b></div>
            //                     <div className="pull-right state">处理中</div>
            //                 </div>
            //                 <div className="serviceOC-context">
            //                     账户：123你好！ 我们部长的账号登陆不理哦啊手机没响，换手机也没用换手机也没用换手机也没用
            //                 </div>

            //                 <div className="serviceOC-foot">
            //                     <div className="item state">2017-10-25</div>
            //                     <div className="pull-right gray">催单</div>
            //                 </div>
            //             </div>

            //             <div className="serviceO-Context">
            //                 <div className="serviceOC-titl">
            //                     <div>单号:<b>123456789</b></div>
            //                     <div className="pull-right state">处理中</div>
            //                 </div>
            //                 <div className="serviceOC-context">
            //                     换手机也没用换手机也没用换手机也没用
            //                 </div>

            //                 <div className="serviceOC-foot">
            //                     <div className="item state">2017-10-25</div>
            //                     <div className="pull-right gray">催单</div>
            //                 </div>
            //             </div>

            //         </div>

            //         <div className="notice">
            //                 <div className="serviceO-title">
            //                     <div className="">最近服务单</div>
            //                     <div className="serviceO-page">
            //                         <span className="pageNum">1/4</span>
            //                         <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
            //                         <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
            //                     </div>
            //                 </div>

            //                 <div className="notice-Context">
            //                     <div className="">《紧急通知》</div>
            //                     <div className="not-Con">
            //                             紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知
            //                             紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通
            //                     </div>
            //                     <div className="not-foot">
            //                             <div className="gray">查看详情>></div>
            //                             <div className="item state pull-right">2017-10-25</div>
            //                     </div>
            //                 </div>

            //         </div>
            //     </div>
            // </div> 
        );
    }
}
module.exports = Chat;