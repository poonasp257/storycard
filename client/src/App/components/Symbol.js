import React from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const Content = styled.img`
    width: 60px;
    height: 60px;
`;

function Symbol(props) {
    return (
    <Draggable tag="board" addItem={props.addItem}>
        <Content src={props.image} alt="symbol" className={props.type}/>
    </Draggable>
    );
}

export default Symbol; 