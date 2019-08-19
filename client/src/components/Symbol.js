import React from 'react';
import styled from 'styled-components';

const Content = styled.img`
    width: 65px;
    height: 65px;
`;

function Symbol({ resource }) {
    return (
        <Content className="symbol" src={resource} draggable="false"/>
    );
}

export default Symbol; 