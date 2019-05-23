import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const Container = styled.div`
    position: relative;
    left: 300px;
    display: 'inline-block';
`;

class Symbol extends Component {
    render() {
        return ( 
            <Container>
                <Draggable setContainer={this.props.setContainer}> 
                    <img src={this.props.image} width="70px" alt="symbol"/>
                </Draggable>
            </Container>
        );
    }
}

export default Symbol; 