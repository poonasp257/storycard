import React, { Component } from 'react';
import styled from 'styled-components';
import { Authentication, ArrowButton } from 'components'

import { connect } from 'react-redux';
import { openAlert } from 'modules/popup';
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

                    this.props.history.push('/main');
                    return true;
                } else {
                    this.props.openAlert({title: "Login", message: "Incorrect username or password"});
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
        },
        openAlert: ({title, message}) => dispatch(openAlert({title, message}))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);