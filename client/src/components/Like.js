import React, { Component } from 'react';
import styled from 'styled-components';
import { NumberWithCommas } from 'lib/Utility'; 

import { connect } from  'react-redux';
import { increaseLikeRequest, decreaseLikeRequest } from 'modules/post';

const Content = styled.div`
    position: absolute;
    left: 50%;
    top: 60%;
    width: 100%;
    text-align: center;
    transform:translate(-50%, -60%);
`;

const Count = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.7em;
    display: inline;
    padding: 0;
`;

class Like extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: props.likes.length,
            isLiked: props.likes.includes(props.username)
        };
    };

    handleClick = () => {
        const { postId, username } = this.props;

        if(this.state.isLiked) { 
            this.props.decreaseLikeRequest(postId, username).then(
                () => {
                    if(this.props.status === 'SUCCESS') {
                        this.setState({ isLiked: false });
                    }
                }
            );
        }
        else { 
            this.props.increaseLikeRequest(postId, username).then(
                () => {                    
                    if(this.props.status === 'SUCCESS') {
                        this.setState({ isLiked: true });
                    }
                }
            );
        }
    }

    render() {
        const heart = this.state.isLiked ? "♥" : "♡";

        return (
            <Content className="white-text" onClick={this.handleClick}>
                <Count>
                    {heart} {NumberWithCommas(this.state.likes)}
                </Count>
            </Content>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        username: state.authentication.getIn(['status', 'currentUser']),
        status: state.post.get(['like', 'status'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increaseLikeRequest: (postId, username) => { 
            return dispatch(increaseLikeRequest(postId, username));
        },
        decreaseLikeRequest: (postId, username) => { 
            return dispatch(decreaseLikeRequest(postId, username));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);