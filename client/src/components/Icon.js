import React from 'react';
import styled from 'styled-components';

export default function Icon(props) {
    const { type, size, color, margin, dir, left, top, ...otherProps } = props;
    const Container = styled.i`
        cursor: pointer;
        font-size: ${size};
        color: ${color};
        margin: ${margin};
        ${() => {
            let degree = 0;

            switch (dir) {
                case 'left': degree = -180; break;
                case 'top': degree = -90; break;
                case 'right': degree = 0; break;
                case 'bottom': degree = 90; break;
                default: degree = 0; break;
            }

            return `transform: translate(${left}, ${top}) rotate(${degree}deg);`;
        }}
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
    margin: '3px',
    dir: 'right',
    left: '0px',
    top: '0px'
};