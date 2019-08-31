import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import $ from 'jquery';
import Materialize from 'materialize-css';
import { Authentication, ArrowButton } from 'components';
import { registerRequest } from 'modules/authentication';

const Button = styled.div`
    position: absolute;
    left: 10%;
    top: 7%;
`; 

class SignUp extends Component {
    handleRegister = (id, pw) => {
        return this.props.registerRequest(id, pw).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    Materialize.toast({ html: `Welcome, ${id}!` });
                    this.props.history.push('/main');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'
                    ];

                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    Materialize.toast({ html: $toastContent });
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Button><ArrowButton to="/signin" size="30px"/></Button>
                <Authentication mode={false} onRegister={this.handleRegister} />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        status: state.authentication.getIn(['register', 'status']),
        errorCode: state.authentication.getIn(['register', 'error'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);