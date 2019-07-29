import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Materialize from 'materialize-css';
import { Authentication } from 'components'
import { loginRequest } from 'actions/authentication';

class SignIn extends Component {
    handleLogin = (id, pw) => {
        return this.props.loginRequest(id, pw).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    Materialize.toast({ html: `Welcome, ${id}!` });
                    this.props.history.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast({ html: $toastContent });
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication mode={true} onLogin={this.handleLogin} />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);