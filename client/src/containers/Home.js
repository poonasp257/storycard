import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Materialize from 'materialize-css';

import { Menu, Board, Symbol, Post, ItemList } from 'components';

import { connect } from 'react-redux';
import { getStatusRequest } from 'modules/authentication';
import { getPostsRequest } from 'modules/post';

const Main = styled.div`
    user-select: none;
    marigin:auto;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 30px;
`;

class Home extends Component {
    constructor(props) {
        super(props);

        this.timerID = null;
    }

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
                if (!this.props.loginStatus.get('valid')) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    const $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast({ html: $toastContent });
                    this.props.history.push('/signin')
                }
            }
        );
    }

    getInfo = () => {
        this.props.getPostsRequest().then(
            () => {
                //console.log(this.props.postStatus);
            }   
        );
    }

    componentDidMount() {
        this.checkLoginData();
        this.getInfo();
        //this.timerID = setInterval(this.getInfo, 1000);
    }

    componentWillUnmount() {
        //clearInterval(this.timerID);
    }

    render() {
        return (
            <Main>
                <Title>STORYCARD</Title>
                <Menu/>
                <Board/>
                <ItemList category="post" Item={Post} targetTag="board"/>
                <ItemList category="symbol" Item={Symbol} targetTag="post"/>
            </Main>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        loginStatus: state.authentication.get('status'),
        postStatus: state.post.getIn(['info', 'status'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        getPostsRequest: () => {
            return dispatch(getPostsRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);