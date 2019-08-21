import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import styled from 'styled-components';

import ReactSVG from 'react-svg';
import background from 'resources/SVG/loginBackground.svg';
import bubble from 'resources/SVG/loginBubble.svg';

//450
const Container = styled.div`
    position: relative;
    width: 400px;
    text-align: center;
    margin: 70px auto;
    user-select: none;
`;

const Logo = styled.div`   
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translate(-50%, 0);
    font-family: 'Black Han Sans', sans-serif;
    font-size: 36px;
    color: #fefae7;
    text-align: left;
`;

const Content = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const InputBoxes = styled.div`
    margin: 40px auto;
    font-family: 'Space Mono', monospace;
    font-size: 24px;
`;

const InputBox = styled.div`  
    width: 300px;
    margin: 20px auto;
`;

const Label = styled.div`
    text-align: left;
    color: #7772b4;
`;

const InputField = styled.input`
    position: absolute;
    left: 15px;
    width: 270px;
    color: #e83c18;
    font: inherit;
    background-color: transparent;
    border: none; 
    :focus {
        outline: none;
    }
`;

const Button = styled.div`  
    width: 160px;
    height: 40px;
    padding: 5px;
    margin: 10px auto;
    font-family: 'Black Han Sans', sans-serif;
    font-size: 36px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    color: #fefae7;
    background-color: #e83c18;
    :hover {
        color: #e83c18;
        background-color: #fefae7;
    }
`;

const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
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
        if(password === "") return; // error;

        this.props.onLogin(username, password).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password:''
                    });
                }
            }
        );
    }

    handleRegister = () => {        
        const { username, password } = this.state;

        this.props.onRegister(username, password).then(
            (result) => {
                if(!result) {
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            }
        );
    }

    handleKeyPress = (e) => {
        if(e.charCode === 13) {
            if(this.props.mode) {
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
                        onChange={this.handleChange} autoComplete="off"/>
                    <ReactSVG src={bubble}/>
                </InputBox>
                <InputBox>
                    <Label>Password</Label>
                    <InputField name="password" type="password" value={this.state.password}
                        onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <ReactSVG src={bubble}/>
                </InputBox>
            </InputBoxes>
        );

        const signInView = (
            <Content>
                {inputBoxes}                
                <Button onClick={this.handleLogin}>로그인</Button>
                <Button><StyledLink to="/signup">회원가입</StyledLink></Button>
            </Content>
        );

        const signUpView = (
            <Content>                    
                {inputBoxes}                
                <Button onClick={this.handleRegister}>회원가입</Button>
            </Content>
        );

        return (
            <Container>
                <ReactSVG src={background} />
                <Logo>스토리카드.</Logo>
                {this.props.mode ? signInView : signUpView}
            </Container>
        );
    }
}



           


export default Authentication;