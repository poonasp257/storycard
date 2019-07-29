import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Authentication.css';

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
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
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
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
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
    };
};

export default Authentication;