import React, { Component } from 'react';
import styled from 'styled-components';
import { Authentication, ArrowButton } from 'components';

import { connect } from 'react-redux';
import { openAlert } from 'modules/popup';
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

                    this.props.openAlert({title: "Register", message: errorMessage[this.props.errorCode - 1]});
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
        },
        openAlert: ({title, message}) => dispatch(openAlert({title, message}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);