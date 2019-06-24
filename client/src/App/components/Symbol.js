import React from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const Content = styled.img`
    width: 60px;
    height: 60px;
`;

function Symbol({type, image, addItem}) {
    return (
    <Draggable tag="board" addItem={addItem}>
        <Content src={image} alt="symbol" className={type}/>
    </Draggable>
    );
}

export default Symbol; 