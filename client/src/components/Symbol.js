import React from 'react';
import styled from 'styled-components';

const Content = styled.img`
    width: ${props => props.mode ? props.size * 2 : props.size}px;
    height: ${props => props.mode ? props.size * 2 : props.size}px;
    display: inherit;
`;

function Symbol({ resource, size, mode }) {
    return (
        <Content className="symbol" src={resource} size={size}
            mode={mode ? 1 : 0} draggable="false"/>
    );
}

Symbol.defaultProps = {
    resource: '',
    size: 40,
    mode: true
}

export default Symbol;