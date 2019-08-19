import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SVG from 'react-svg';
import background from 'resources/SVG/loginBackground.svg';
import bubble from 'resources/SVG/loginBubble.svg';

const Container = styled.div`
    position: relative;
    width: 400px;
    hieght: 400px;
    text-align: center;
    margin: 70px auto;
    pointer-events: none;
    user-select: none;
`;

const Logo = styled.div`
    position: absolute;
    left: 130px;
    top: 0px;
    margin: 5px auto;
    font-family: 'Jua', sans-serif;
    font-size: 34px;
    color: #fefae7;
`;

const InputBoxes = styled.div`
    position: absolute;
    font-family: 'Space Mono', monospace;
    font-size: 24px;
`;

const InputBox = styled.div`    
    width: 250px;
    height: 100px;
`;

const Label = styled.label`
    color: #7772b4;
`;

const InputField = styled.input`
    color: #e83c18;
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
    //     const inputBoxes = (
    //         <InputBoxes>
    //             <InputBox>
    //                 <Label>Username</Label>
    //                 <SVG src={bubble}/>
    //                 <InputField name="username" type="text" className="validate" value={this.state.username}
    //                     onChange={this.handleChange}/>
    //             </InputBox>                
    //             <InputBox>
    //                 <Label>Password</Label>
    //                 <SVG src={bubble}/>
    //                 <InputField name="password" type="password" className="validate" value={this.state.password}
    //                     onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
    //             </InputBox>
    //         </InputBoxes>
    //     );

    //     const signInView = (
    //         <div>
    //             {inputBoxes}
    //         </div>
    //     );

    //     const signUpView = (
    //         <div>
                
    //         </div>
    //     );

        
const inputBoxes = (
    <div>
        <div className="input-field col s12 username">
            <label>Username</label>
            <input name="username" type="text" className="validate" value={this.state.username}
                onChange={this.handleChange}/>
        </div>
        <div className="input-field col s12">
            <label>Password</label>
            <input name="password" type="password" className="validate" value={this.state.password}
                onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
        </div>
    </div>
);


        const signInView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <button className="waves-effect waves-light btn"
                            onClick={this.handleLogin}>SUBMIT</button>
                    </div>
                </div>
                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/signup">Create account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        const signUpView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <button className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>CREATE</button>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">STORYCARD</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "SIGNIN" : "SIGNUP"}</div>
                    </div>
                    {this.props.mode ? signInView : signUpView }
                </div>
            </div>
        );

        
    //     <Container>
    //     <SVG src={background}/>
    //     <Logo className="logo">스토리카드.</Logo>
    //     {this.props.mode ? signInView : signUpView }
    // </Container>

        return (            
            <div className="container auth">
                <Link className="logo" to="/">STORYCARD</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "SIGNIN" : "SIGNUP"}</div>
                    </div>
                    {this.props.mode ? signInView : signUpView }
                </div>
            </div>
        );
    };
};

export default Authentication;
        