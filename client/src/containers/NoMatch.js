import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    text-align: center;
    margin: 400px;
    font-family: "Space Mono", monospace;
`;

const Message = styled.p`
    color: #fefae7;
    font-size: 34px;
    text-decoration: none;
`;

const Button = styled(Link)`
    border-radius: 30px;
    padding: 4px 18px 10px 18px;
    background-color: #e83c18;
    color: #fefae7;
    font-size: 30px;
    text-decoration: none;

    :hover {
        background-color: #fefae7;
        color: #e83c18;
    }
`;

function NoMatch() {
    return (
        <Container>            
            <Message>:( Sorry, we couldn't find that page</Message>
            <Button to="/">go to main</Button>
        </Container>
    );
};

export default NoMatch;