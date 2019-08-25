import React from 'react';
import styled from 'styled-components';

export default function Icon(props) {
    const { type, size, color, margin, ...otherProps } = props;
    const Container =  styled.i`
        cursor: pointer;
        font-size: ${size};
        color: ${color};
        margin: ${margin};
    `;
    
    return (
        <Container className="material-icons" {...otherProps}>
            {type}
        </Container>
    );
}

Icon.defaultProps = {
    type: '',
    size: 'inherit',
    color: 'inherit',
    margin: '3px'
};