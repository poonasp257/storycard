import React from 'react';
import styled from 'styled-components';

const Content = styled.img`
    width: 60px;
    height: 60px;
`;

function Symbol({ image }) {
    return (
        <Content src={image} draggable="false">
        </Content>
    );
}

export default Symbol; 