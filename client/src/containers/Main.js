import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import Materialize from 'materialize-css';

import { Menu, Board } from 'components';

//, Symbol, Post, ItemList 

import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'modules/authentication';
import { getPostsRequest, getSymbolsRequest, updateItems } from 'modules/post';

import io from 'socket.io-client';

const Container = styled.div`
    user-select: none;
    text-align: center;
`;

const Title = styled(Link)`
    text-align: center;
    font-weight: 300;
    font-size: 80px;
    color: black;
    margin: 10px; 
    display: inline-block;
`;

class Main extends Component {
    constructor(props) {
        super(props);
 
        this.socket = io.connect('http://localhost:5000');
    }

    handleLogin = () => {        
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie('key'); 
        if (typeof loginData === "undefined") { 
            window.location.href = "/signin";
            return false;
        }

        loginData = JSON.parse(atob(loginData));
        if (!loginData.isLoggedIn) { 
            window.location.href = "/signin";
            return false;
        }

        return this.props.getStatusRequest().then(
            () => {
                if (!this.props.status.auth.get('valid')) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    const $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    Materialize.toast({ html: $toastContent });
                    window.location.href = "/signin";
                    return false;
                }

                return true;
            }
        );
    }

    handleLogout = () => {
        this.props.logoutRequest().then(
            () => {
                document.cookie = '';
                Materialize.toast({ html: 'Good Bye!'});
                window.location.href = "/signin";
            }
        );
    }

    getItems = () => {
        const { postId } = this.props.match.params;

        // Home
        if(postId === undefined) {
            this.props.getPostsRequest().then(
                () => {

                }   
            );
        }
        else { // Post page
            this.props.getSymbolsRequest(postId).then(
                () => {

                }
            );
        }
    }
    
    componentDidMount() { 
        if(!this.handleLogin()) return;

        this.getItems();
        this.props.updateItems(this.socket);
    }

    componentWillUnmount() {
        this.socket.removeAllListeners();
    }

    render() {
        return (
            <Container>
                <Title to="/">STORYCARD</Title>
                <Menu onLogout={this.handleLogout}/>
                <Board/>
            </Container>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        status: {
            auth: state.authentication.get('status'),
            items: state.post.getIn(['info', 'status'])
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
        getPostsRequest: () => {
            return dispatch(getPostsRequest());
        },
        getSymbolsRequest: (postId) => {
            return dispatch(getSymbolsRequest(postId));
        },
        updateItems: (socket) => dispatch(updateItems(socket))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);