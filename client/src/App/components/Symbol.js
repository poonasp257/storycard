import React from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const Content = styled.img`
`;

function Symbol(props) {
    return (
    <Draggable tag="board" addItem={props.addItem}>
        <Content src={props.image} alt="symbol" className={props.type}/>
    </Draggable>
    );
}

export default Symbol; 