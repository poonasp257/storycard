import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const Content = styled.img`
`;

class Symbol extends Component {
    render() {
        return (
            <Draggable tag="board" addItem={this.props.addItem}>
                <Content src={this.props.image} alt="symbol" />
            </Draggable>
        );
    }
}

export default Symbol; 