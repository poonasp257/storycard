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
                <Draggable target={this.props.target}> 
                    <img src={this.props.image} width="70px"/>
                </Draggable>
            </Container>
        );
    }
}

export default Symbol; 