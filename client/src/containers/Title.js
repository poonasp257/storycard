import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ReactSVG from 'react-svg';
import title from 'resources/SVG/title.svg';
import start from 'resources/PNG/title-start.png';
import tutorial from 'resources/PNG/title-tutorial.png';
import credit from 'resources/PNG/title-credit.png';

const Container = styled.div`
    text-align: center;
    margin: 200px;
`;

const Header = styled(ReactSVG)`
    width: 300px;
    margin: 0 auto;
`;

const ButtonList = styled.div`
    display: table;
    margin: 45px auto;
`;

const Button = styled.div`
    display: table;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    cursor: pointer;    
    background: url(${props => props.src});
    :hover {
        background-position: 0px ${props => props.height}px;
    }
    color: #e83c18;
    font-size: 30px;
    font-family: 'Space Mono', monospace;
`;

const Name = styled(Link)`
    display: table-cell;
    text-align: center;
    vertical-align: middle;
`;

class Title extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Container>
                <Header src={title}/>
                <ButtonList>
                    <Button src={start} width={388} height={173}>
                        <Name to="/signin" draggable="false">Start</Name>
                    </Button>
                    <Button src={tutorial} width={394} height={140}>
                        <Name to="/tutorial" draggable="false">Tutorial</Name>
                    </Button>
                    <Button src={credit} width={393} height={166}>
                        <Name to="/credit"draggable="false">Credit</Name>
                    </Button>
                </ButtonList>
            </Container>
        );
    };
};

export default Title;