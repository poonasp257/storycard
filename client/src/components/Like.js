import React, { Component } from 'react';
import styled from 'styled-components';
import { NumberWithCommas } from 'lib/Utility';

import { connect } from 'react-redux';
import { LikeRequest } from 'modules/post';

import ReactSVG from 'react-svg';
import heart from 'resources/SVG/heart.svg';

const Container = styled.div`
    position: absolute;
    ${props => props.mode ? 'left: 20px; top: 310px;' 
        : 'left: 80px; top: 100px;'
    }
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
    .cls-12 { 
        fill: ${props => props.isLiked ? '#e83e19' : 'none'};
    }
    ${props => !props.mode ? '' : `    
        :hover {
            .cls-12 {
                fill: ${props.isLiked ? 'none' : '#e83e19'};
            }
        }
    `}
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
        //console.log('Like component get new props...', nextProps.likes);

        return { likes: nextProps.likes };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const isUpdated = (JSON.stringify(nextProps) != JSON.stringify(this.props))
            || (JSON.stringify(nextState) != JSON.stringify(this.state));

        return isUpdated;
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
        status: state.post.get(['like', 'status'])
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