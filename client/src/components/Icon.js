import React from 'react';
import styled from 'styled-components';

export default function Icon(props) {
    const { type, size, color, ...otherProps } = props;
    const Container =  styled.i`
        cursor: pointer;
        font-size: ${size}px;
        color: ${color};
    `;
    
    return (
        <Container className="material-icons" {...otherProps}>
            {type}
        </Container>
    );
}