import React, { Component } from 'react';
import styled from 'styled-components';
import { ItemList, Post, Symbol } from 'components';
import ReactSVG from 'react-svg';
import menuButton from 'resources/SVG/menuButton.svg';
import menuButtonHover from 'resources/SVG/menuButtonHover.svg';
import menuBackground from 'resources/SVG/menuBackground.svg';

const Container = styled.div`    
    position: fixed;
    right: -600px;
    top: 25%;
    transition: transform 0.6s ease;
    transform: translateX(${ props => {
        if(props.isOpened) return -500;
        else return 0; 
    }}px);
    z-index: 1;
`;

const Button = styled(ReactSVG)`
    position: relative;
    top: 0px;
    width: 30px;
    display: inline-block;
    cursor: pointer;
`;

const Content = styled.div`   
    position: relative;
    display: inline-block;
`;

const Category = styled.div`
    position: absolute;
    left: 100px;
    top: 10px;
    font-family: 'Jua', sans-serif;
    font-size: 32px;
    color: #7772b4;
`;
  
const MenuBackground = styled(ReactSVG)`
    width: 600px;
`;

const ListContainer = styled.div`
    position: absolute;
    top: 50px;
    margin: 50px;
`;
 
class Menu extends Component {
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
                <MenuButton normal={menuButton} hover={menuButtonHover} handleClick={this.handleMenu}/>
                <Content>
                    <Category>갈등</Category>
                    <MenuBackground src={menuBackground}/>
                    <ListContainer>
                        <ItemList category="conflict" Item={Symbol} tag="symbol" targetTag="board"/>
                        <ItemList category="post" Item={Post} tag="post" targetTag="board"/> 
                    </ListContainer>
                </Content>
            </Container>
        );
    };
};

class MenuButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isHover: false }
    }

    handleMouseEnter = (event) => {
        this.setState({ isHover: true });
    }

    handleMouseLeave = (event) => {
        this.setState({ isHover: false });
    }

    render() {
        const { normal, hover, handleClick } = this.props;
        const image = this.state.isHover ? hover : normal;

        return (
            <Button src={image}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={handleClick}/>
        )
    }
}

export default Menu;