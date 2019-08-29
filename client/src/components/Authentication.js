import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Materialize from 'materialize-css';

import ReactSVG from 'react-svg';
import background from 'resources/login/SVG/loginBackground.svg';
import bubble from 'resources/login/SVG/loginBubble.svg';

const Container = styled.div`
    position: relative;
    width: 400px;
    text-align: center;
    margin: 200px auto;
`;

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const Header = styled.div`
    text-align: center;    
    margin: 5px auto; 
    color: #fefae7;
    font-size: 24px;
    font-family: 'Space Mono', monospace;
`;

const InputBoxes = styled.div`  
    margin-top: 100px;
    font-size: 24px;
    font-family: 'Space Mono', 'Do Hyeon', monospace;
`;

const InputBox = styled.div`
    position: relative;
    width: 70%;
    margin: 20px auto;
`;

const Label = styled.div`
    text-align: left;
    color: #7772b4;
`;

const InputField = styled.input`
    position: absolute;
    left: 5%;
    width: 90%;
    font: inherit;
    color: #e83c18;
    background-color: transparent;
    border: none; 
    :focus {
        outline: none;
    }
`;

const ButtonList = styled.div`
    margin: 50px auto;
`;

const Button = styled.div`  
    width: 130px;
    height: 40px;
    margin: 10px auto;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    color: #fefae7;
    background-color: #e83c18;
    :hover {
        color: #e83c18;
        background-color: #fefae7;
    }
    font-size: 23px;
    font-family: 'Do Hyeon', sans-serif;
    display: table;
`;

const Name = styled.span`
    display: table-cell;
    vertical-align: middle;
`;

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin = () => {
        const { username, password } = this.state;
        if (password === "") { 
            Materialize.toast({ html: `The password field is empty` });
            return;
        }

        this.props.onLogin(username, password).then(
            (success) => {
                if (!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister = () => {
        const { username, password } = this.state;

        this.props.onRegister(username, password).then(
            (result) => {
                if (!result) {
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            }
        );
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            if (this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render() {
        const inputBoxes = (
            <InputBoxes>
                <InputBox>
                    <Label>Username</Label>
                    <InputField name="username" type="text" value={this.state.username}
                        onChange={this.handleChange} autoComplete="off" />
                    <ReactSVG src={bubble} />
                </InputBox>
                <InputBox>
                    <Label>Password</Label>
                    <InputField name="password" type="password" value={this.state.password}
                        onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                    <ReactSVG src={bubble} />
                </InputBox>
            </InputBoxes>
        );

        const signInView = (
            <Content>
                <Header>Login</Header>
                {inputBoxes}
                <ButtonList>
                    <Button onClick={this.handleLogin}>
                        <Name>로그인</Name>
                    </Button>
                    <Link to="/signup" draggable={false}>
                        <Button>
                            <Name>회원가입</Name>
                        </Button>
                    </Link>
                </ButtonList>
            </Content>
        );

        const signUpView = (
            <Content>
                <Header>Register</Header>
                {inputBoxes}
                <ButtonList>
                    <Button onClick={this.handleRegister}>
                        <Name>회원가입</Name>
                    </Button>
                </ButtonList>
            </Content>
        );

        return (
            <Container>
                <ReactSVG src={background} />
                {this.props.mode ? signInView : signUpView}
            </Container>
        );
    }
}

export default Authentication;