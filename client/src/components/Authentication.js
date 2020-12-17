import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { openAlert } from 'modules/popup';

const Container = styled.div`
    margin: 200px auto;
    text-align: center;
`;

const Header = styled.div` 
    width: fit-content;
    margin: 0 auto;
    padding: 3px 60px 5px 60px;
    border-radius: 25px 25px 0px 0px;
    text-align: center;
    font-size: 24px;
    font-family: 'Space Mono', monospace;
    color: #fefae7;
    background-color: #e83c18;
`;

const Content = styled.div` 
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
    border-radius: 40px;
    background-color: #f5c620;
    display: table;
    text-align: center;
`;

const InputBoxes = styled.div` 
    margin: 90px 60px 60px 60px;
    font-size: 24px;
    font-family: 'Space Mono', 'Do Hyeon', monospace;
`;

const InputBox = styled.div`
    margin: 20px auto;
`;

const Label = styled.div`
    text-align: left;
    color: #7772b4;
`;

const InputField = styled.input`
    font: inherit;
    color: #e83c18;
    background-color: #fefae7;
    padding: 0px 10px 0px 10px;
    width: 230px;
    border: none;
    border-radius: 0px 30px 30px 30px; 
    :focus {
        outline: none;
    }
`;

const ButtonList = styled.div`
    margin-bottom: 80px;
`;

const Button = styled.div`  
    width: 120px;
    margin: 10px auto;
    padding: 5px 0px 5px 0px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 20px;
    font-family: 'Do Hyeon', sans-serif;
    color: #fefae7;
    background-color: #e83c18;
    :hover {
        color: #e83c18;
        background-color: #fefae7;
    }
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
        if (username === "" || password === "") {
            this.props.openAlert({title: "Login", message: "The username or password field is empty"});
            return;
        }

        this.props.onLogin(username, password).then(
            (success) => {
                if (!success) this.setState({ password: '' });
            }
        );
    }

    handleRegister = () => {
        const { username, password } = this.state;

        if (username === "" || password === "") {
            this.props.openAlert({title: "Register", message: "The username or password field is empty"});
            return;
        }

        this.props.onRegister(username, password);
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            if (this.props.mode) this.handleLogin();
            else this.handleRegister();
        }
    }

    render() {
        const inputBoxes = (
            <InputBoxes>
                <InputBox>
                    <Label>Username</Label>
                    <InputField name="username" type="text" value={this.state.username}
                        onChange={this.handleChange} autoComplete="off" />
                </InputBox>
                <InputBox>
                    <Label>Password</Label>
                    <InputField name="password" type="password" value={this.state.password}
                        onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                </InputBox>
            </InputBoxes>
        );

        const signInView = (
            <Container>
                <Header>Login</Header>
                <Content>
                    {inputBoxes}
                    <ButtonList>
                        <Button onClick={this.handleLogin}>로그인</Button>
                        <Link to="/signup" draggable={false}>
                            <Button>회원가입</Button>
                        </Link>
                    </ButtonList>
                </Content>
            </Container>
        );

        const signUpView = (
            <Container>
                <Header>Register</Header>
                <Content>
                    {inputBoxes}
                    <ButtonList>
                        <Button onClick={this.handleRegister}>회원가입</Button>
                    </ButtonList>
                </Content>
            </Container>
        );

        return this.props.mode ? signInView : signUpView;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openAlert: (option) => dispatch(openAlert(option))
    };
};

export default connect(null, mapDispatchToProps)(Authentication);