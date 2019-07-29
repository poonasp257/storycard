import React, { Component } from 'react';
import styled from 'styled-components';
import { NumberWithCommas } from 'lib/Utility';
import heart from 'resources/heart.png';

const Content = styled.div`
    position: absolute;
    left: 15px;
    bottom: 15px;
`;

const Heart = styled.img`
    width: 30px;
    height: 30px;
`;

class Like extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            like: 100000
        };
    };

    handleClick = (e) => {
        this.setState({
            like: this.state.like + 1
        });
    }

    render() {
        return (
            <Content>
                <Heart src={heart} onClick={this.handleClick}/> {NumberWithCommas(this.state.like)} likes
            </Content>
        );
    };
};

export default Like;