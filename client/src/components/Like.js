import React, { Component } from 'react';
import styled from 'styled-components';
import { NumberWithCommas } from 'lib/Utility';

import { connect } from 'react-redux';
import { increaseLikeRequest, decreaseLikeRequest } from 'modules/post';

import ReactSVG from 'react-svg';
import heart from 'resources/SVG/heart.svg';

const opened = `
    left: 20px; 
    top: 320px;
`;

const notOpened = `
    left: 70px;
    top: 90px;
`;

const Container = styled.div`
    position: absolute;
    ${props => props.mode ? opened : notOpened}
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    font-weight: bold;
    display: flex;
`;

const Heart = styled(ReactSVG)`
    width: 20px; 
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
`;

const Count = styled.div`
    display: inline-block;
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

        if (this.state.isLiked) {
            this.props.decreaseLikeRequest(postId, username).then(
                () => {
                    if (this.props.status === 'SUCCESS') {
                        this.setState({ isLiked: false });
                    }
                }
            );
        }
        else {
            this.props.increaseLikeRequest(postId, username).then(
                () => {
                    if (this.props.status === 'SUCCESS') {
                        this.setState({ isLiked: true });
                    }
                }
            );
        }
    }

    render() {
        return (
            <Container mode={this.props.mode}>
                <Heart src={heart} onClick={this.handleClick}/> 
                <Count>{NumberWithCommas(this.state.likes)}</Count>
            </Container>
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