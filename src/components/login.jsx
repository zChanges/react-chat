import React, { Component, contextTypes } from "react";
import { Col, Form, FormGroup,ControlLabel, FormControl, Checkbox, Button  } from "react-bootstrap";
import { Link  } from 'react-router-dom';
import { browserHistory } from 'react-router'


export default class Login extends Component {
    constructor(context){
        super(context)

        this.state = {
            userName:'',
            passWord:''
        }
    }

    handleUserChange(e) {
        this.setState({ userName: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ passWord: e.target.value });
    }

    login() {
        console.log(this.state.passWord);
        console.log(this.state.userName);
        // browserHistory.push('/Chat');
        console.log(this.context)
        this.context.router.push('/Chat');
    }

    render() {
        return (
            <div className="container">
                <Col xs={12} sm={8} md={8} lg={10} >
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                    <Col smOffset={3} componentClass={ControlLabel} sm={2}>
                        用户名
                    </Col>
                    <Col sm={5}>
                        <FormControl  onChange={this.handleUserChange.bind(this)}  value={this.state.userName} type="text" placeholder="用户名" />
                    </Col>
                    </FormGroup>
                
                    <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={3}  componentClass={ControlLabel} sm={2}>
                        密码
                    </Col>
                    <Col sm={5}>
                        <FormControl onChange={this.handlePasswordChange.bind(this)} value={this.state.passWord} type="password" placeholder="密码" />
                    </Col>
                    </FormGroup>
                
                    <FormGroup>
                    <Col smOffset={5} sm={5}>
                        <Button type="button" bsStyle="success" onClick={this.login.bind(this)}>
                        登陆
                        </Button>
                    </Col>
                    </FormGroup>
                </Form> 
                </Col>
            </div>
        ) 
    }
}