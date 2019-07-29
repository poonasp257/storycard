import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Materialize from 'materialize-css';

import { Menu, Board, Symbol, Post, ItemList } from 'components';

import { connect } from 'react-redux';
import { getStatusRequest } from 'actions/authentication';

const Main = styled.div`
    user-select: none;
    marigin:auto;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 30px;
`;

class Home extends Component {
    checkLoginData = () => {        
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key');
        if (typeof loginData === "undefined") {
            this.props.history.push('/signin')
            return;
        }

        loginData = JSON.parse(atob(loginData));
        if (!loginData.isLoggedIn) {
            this.props.history.push('/signin')
            return;
        }

        this.props.getStatusRequest().then(
            () => {
                if (!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    const $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast({ html: $toastContent });
                }
            }
        );
    }

    componentDidMount() {
        //this.checkLoginData();
    }

    render() {
        return (
            <Main>
                <Title>STORYCARD</Title>
                <Menu/>
                <Board/>
                <ItemList category="SYMBOLS" Item={Symbol} targetTag="post"/>
                <ItemList category="POSTS" Item={Post} targetTag="board"/>
            </Main>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);