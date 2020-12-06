import React, { Component } from 'react';
import styled from 'styled-components';
import { NumberWithCommas } from 'lib/Utility';

import { connect } from 'react-redux';
import { LikeRequest } from 'modules/item';

import { ReactSVG } from 'react-svg';
import heart from 'resources/main/SVG/heart.svg';

const containerStyle = {
    activated: `
        left: 20px; 
        top: 310px;
        font-size: 14px;
    `,
    deactivated: `
        left: 35px; 
        top: 45px;
        font-size: 10px;    
    `
};

const Container = styled.div`
    display: flex;
    position: absolute;
    ${props => props.mode ? containerStyle.activated : containerStyle.deactivated}
    font-weight: bold;
    font-family: 'Space Mono', monospace;
`;

const Heart = styled(ReactSVG)`
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
    .cls-12 { 
        fill: ${props => props.isLiked ? '#e83e19' : 'none'};
    }
    ${props => props.mode ? `
    width: 20px;
    :hover {
        .cls-12 {
            fill: ${props => props.isLiked ? 'none' : '#e83e19'};
        }
    }` : `width: 12px;`}
`;

const Count = styled.div`
    display: inline-block;
`;

class Like extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: props.likes,
            isLiked: props.likes.includes(props.username)
        };
    };

    handleClick = (event) => {
        const { likes, isLiked } = this.state;
        const index = likes.findIndex(username => username === this.props.username);

        this.props.LikeRequest(this.props.postId, index).then(
            () => {    
                this.setState({ isLiked: !isLiked });
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { likes: nextProps.likes };
    }

    render() {
        const { likes, isLiked } = this.state;
        const mode = this.props.mode; 

        return (
            <Container mode={mode}>
                <Heart mode={mode} src={heart} onClick={mode ? this.handleClick : null} isLiked={isLiked}/> 
                <Count>{NumberWithCommas(likes.length)}</Count>
            </Container>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        username: state.authentication.getIn(['status', 'currentUser']),
        status: state.item.get(['like', 'status'])
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        LikeRequest: (postId, index) => {
            return dispatch(LikeRequest(postId, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Like);