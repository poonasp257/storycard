import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import $ from 'jquery';
import Materialize from 'materialize-css';
import { Authentication, ArrowButton } from 'components'
import { loginRequest } from 'modules/authentication';

const Button = styled.div`
    position: absolute;
    left: 10%;
    top: 7%;
`; 

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
                    this.props.history.push('/main');
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
                <Button><ArrowButton to="/" size="30px"/></Button>
                <Authentication mode={true} onLogin={this.handleLogin} />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        status: state.authentication.getIn(['login', 'status'])
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