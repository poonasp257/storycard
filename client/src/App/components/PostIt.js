import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const Content = styled.img`
    width: 300px;
    height: 200px;
    border: solid;
    border-width: 1px;
    box-shadow: 5px 5px 8px 4px rgba(0, 0, 0, 0.5);
    background-color: #BAECFF;
    font-size: 3em;
    text-align: center;
    vertical-align: center;
    line-height: 200px;
`;

class PostIt extends Component {
    render() {
        return (
            <Draggable tag="board" setContainer={this.props.setContainer}>
                <Content />
            </Draggable>
        );
    }
}

export default PostIt; 