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

function BackButton({ to, size, color, bgColor }) {
    return (
        <Link to={to} draggable="false">
            <Button color={color} bgColor={bgColor}>
                <Icon type="forward" size={size} dir="left" left="-1px"/>
            </Button>
        </Link>
    );
}

export default BackButton;