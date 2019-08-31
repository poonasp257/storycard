import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const Button = styled.div`  
    display: inline-block;   
    margin: 3px; 
    padding: 3px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    color: #fefae7;
    background-color: #e83c18;
    :hover {
        color: #e83c18;
        background-color: #fefae7;
    }
`;

function ArrowButton({ to, size, dir, handleClick }) {
    return (
        <Link to={to} draggable="false">
            <Button onClick={handleClick}>
                <Icon type="forward" size={size} dir={dir} left="-1px"/>
            </Button>
        </Link>
    );
}

ArrowButton.defaultProps = {
    size: '24px',
    dir: 'left',
}

export default ArrowButton;