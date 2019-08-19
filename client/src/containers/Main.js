import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Materialize from 'materialize-css';
import { Menu, Board } from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'modules/authentication';
import { getPostsRequest, getSymbolsRequest, updateItems } from 'modules/post'; 
import io from 'socket.io-client';

import ReactSVG from 'react-svg';
import back from 'resources/SVG/back.svg';
import backHover from 'resources/SVG/backHover.svg';

const Container = styled.div`
    position: relative;
    user-select: none;
    text-align: center;
`;

const Header = styled.div`
    height: 120px;
    background-color: #f5c620;
`;

const Title = styled(Link)`  
    position: absolute;
    left: 50%;
    top: 35px;
    transform: translate(-50%, 0);
    width: 170px;
    height: 40px;
    padding-top: 10px;
    text-decoration: none;
    font-family: 'Black Han Sans', sans-serif;
    font-size: 28px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    color: #fefae7;
    background-color: #e83c18;
    :hover {
        color: #e83c18;
        background-color: #fefae7;
    }
`;

const Button = styled(ReactSVG)`
    position: absolute;
    left: 250px;
    top: 30px;
    width: 50px;
    cursor: pointer;
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

        return new Promise((resolve, reject) => {
            this.props.getStatusRequest().then(
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
                        reject(false);
                    }

                    resolve(true);
                }
            );
        });
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
        this.handleLogin().then(
            (success) => {
                if (!success) return;

                this.getItems();
                this.props.updateItems(this.socket);
            }
        );
    }

    componentWillUnmount() {
        this.socket.removeAllListeners();
    }

    render() {
        return (
            <Container>
                <Header>
                    <BackButton normal={back} hover={backHover} handleClick={this.handleLogout}/>
                    <Title to="/">스토리카드.</Title>
                </Header>
                <Menu/>
                <Board/>
            </Container>
        );
    };
};

class BackButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isHover: false }
    }

    handleMouseEnter = (event) => {
        this.setState({ isHover: true });
    }

    handleMouseLeave = (event) => {
        this.setState({ isHover: false });
    }
    
    render() {
        const { normal, hover, handleClick } = this.props;
        const image = this.state.isHover ? hover : normal;

        return (
            <Button src={image}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={handleClick}/>
        )
    }
}


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