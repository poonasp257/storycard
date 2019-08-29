import React, { Component } from 'react';
import styled from 'styled-components';
import { ItemList, Post, Symbol } from 'components';

import ReactSVG from 'react-svg';
import background from 'resources/main/SVG/board-toolkit.svg';
import toolkitButton from 'resources/main/SVG/board-toolkitButton.svg';
import toolBubble1 from 'resources/main/SVG/toolBubble1.svg';
import toolBubble2 from 'resources/main/SVG/toolBubble2.svg';

const Container = styled.div`    
    position: fixed;
    right: -400px;
    z-index: 1;
    transition: transform 0.6s ease;
    transform: translateX(${ props => {
        if(props.isOpened) return -400;
        else return 0; 
    }}px);
`;

const Background = styled(ReactSVG)`
    width: 450px;
    height: 863px;
    cls-1 {
        fill:#f5cf49;
    }
    cls-2 {
        fill:#e73e19;
    }
    :hover {}
`;

const Content = styled.div`   
    position: absolute;
    left: 11.2px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const ToolkitButton = styled(ReactSVG)`
    float: left;
    width: 50px;
    cursor: pointer;
    .cls-2 { fill:#e73e19; }
    .cls-3 { fill:#fdf9e6; }
    :hover {
        .cls-2 { fill:#fdf9e6; }
        .cls-3 { fill:#e73e19; }
    }
`;

const ToolkitBox = styled.div`
    float: left;
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
                <Background src={background}/>
                <Content>
                    <ToolkitButton src={toolkitButton} onClick={this.handleMenu}/>
                    <ToolkitBox>
                        <Name>Toolkit</Name>                        
                        <ItemList bg={toolBubble1} category="conflict" Item={Symbol} tag="symbol" targetTag="board" size={45} itemSpacing={7}/>
                        <ItemList bg={toolBubble1} category="resolution" Item={Symbol} tag="symbol" targetTag="board" size={40} itemSpacing={10}/>
                        <ItemList bg={toolBubble2} category="post" Item={Post} tag="post" targetTag="board" size={45} itemSpacing={10}/>
                    </ToolkitBox>
                </Content>
            </Container>
        );
    };
};

export default Toolkit;