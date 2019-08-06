import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Materialize from 'materialize-css';
import { Authentication } from 'components';
import { registerRequest } from 'modules/authentication';

class SignUp extends Component {
    handleRegister = (id, pw) => {
        return this.props.registerRequest(id, pw).then(
            () => {
                if (this.props.status === "SUCCESS") {
                    Materialize.toast({ html: 'Success! Please log in.' });
                    this.props.history.push('/signin');
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