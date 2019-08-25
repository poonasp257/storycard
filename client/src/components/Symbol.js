import React from 'react';
import styled from 'styled-components';

const Content = styled.img`
    width: ${props => props.mode ? `80` : `40` }px;
    height: ${props => props.mode ? '80' : '40' }px;
    display: inherit;
`;

function Symbol({ resource, mode }) {
    return (
        <Content className="symbol" src={resource} mode={mode ? 1 : 0} draggable="false"/>
    );
}

Symbol.defaultProps = {
    resource: '',
    mode: true
}

export default Symbol;