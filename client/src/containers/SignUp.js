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
            (error) => {
                if (error) {
                    this.props.openAlert({title: "Register", message: error });
                    return;
                }

                let loginData = JSON.stringify({
                    isLoggedIn: true,
                    username: id
                });

                document.cookie = 'key=' + btoa(loginData);
                this.props.history.push('/main');
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
        status: state.authentication.getIn(['register', 'status'])
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