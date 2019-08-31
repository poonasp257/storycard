import React, { Component } from 'react';
import styled from 'styled-components';
import { ItemList, Post, Symbol } from 'components';
import Icon from './Icon';

const Container = styled.div`    
    position: fixed;
    right: -405px;
    z-index: 1;
    transition: transform 0.6s ease;
    transform: translateX(${ props => {
        if(props.isOpened) return '-405px';
        else return '0px'; 
    }});
`;

const Button = styled.div`
    float: left;
    padding: 3px 4px 3px 5px;
    border-radius: 30px 0px 0px 30px; 
    cursor: pointer;
    color: #fefae7;
    background-color: #e83c18;
    :hover {
        color: #e83c18;
        background-color: #fefae7;;
    }
`;

const Content = styled.div`   
    float: right;
    border-radius: 0px 0px 0px 30px;
    background-color: #f5c620;
`;

const Box = styled.div`
    margin: 15px 0px 0px 35px;
`;

const Name = styled.span`    
    color: #7772b4;
    font-size: 36px;
    font-family: 'Space Mono', monospace;
`;
 
class Toolkit extends Component {
    constructor(props) {
        super(props); 

        this.state = { 
            isHover: false,
            isOpened: false,
            menu: null
        };
    }    

    handleMouseEnter = (event) => {
        this.setState({ isHover: true });
    }

    handleMouseLeave = (event) => {
        this.setState({ isHover: false });
    }

    handleMenu = (event) => {
        this.setState({
            isOpened: !this.state.isOpened,
            menu: null
        });
        document.addEventListener('mousedown', this.closeMenu, false);
    } 

    closeMenu = (event) => {        
        this.setState({
            isOpened: false,
            menu: null
        });
        document.removeEventListener('mousedown', this.closeMenu, false);
    }

    render() { 
        return (
            <Container isOpened={this.state.isOpened}>
                <Button onClick={this.handleMenu}>
                    <Icon type="brush" size="24px"/>
                </Button>
                <Content>
                    <Box>
                        <Name>Toolkit</Name>
                        <ItemList category="conflict" Item={Symbol} tag="symbol" targetTag="board" size={45} />
                        <ItemList category="resolution" Item={Symbol} tag="symbol" targetTag="board" size={40} />
                        <ItemList category="post" Item={Post} tag="post" targetTag="board" size={45} />
                    </Box>
                </Content>
            </Container>
        );
    };
};




export default Toolkit;