import React, { Component } from 'react';
import styled from 'styled-components';
import Materialize from 'materialize-css';

import { Icon, ItemList, Post, Symbol } from 'components';

const Container = styled.div`    
    position: fixed;
    top: 0px;
    right: 0px;
    display: inline-block;
`;
 
const Button = styled.div`
    top: 0px;
    right: 0px;
    height: 60px;
    margin: 15px;     
`;

const Template = styled.div`
    width: ${window.screen.width * 0.15}px;
    height: ${window.screen.height * 0.8}px;
    margin: 15px;
    padding: 15px;
    border: 2px solid;
    background-color: white;
`;
 
class Menu extends Component {
    constructor(props) {
        super(props); 

        this.state = { 
            isOpened: false,
            menu: null
        };
    }    

    componentDidMount() {
        let elems = document.querySelector('.fixed-action-btn');
        Materialize.FloatingActionButton.init(elems, {
            direction: 'left',
            hoverEnabled: false
        });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeMenu);
    }

    openMenu = (contents) => {        
        const menu = 
            <Template>
                {contents}
            </Template>;        

        this.setState({
            isOpened: true,
            menu: menu
        });
        document.addEventListener('mousedown', this.closeMenu);
    }
    
    closeMenu = (event) => {
        this.setState({
            isOpened: false,
            menu: null
        });
        document.removeEventListener('mousedown', this.closeMenu);
    }

    openMenuPost = (event) => {
        const contents = <ItemList category="post" Item={Post} tag="post" targetTag="board"/>;
        this.openMenu(contents);
    }

    openMenuConflicts = (event) => {
        const contents = <ItemList category="conflict" Item={Symbol} tag="symbol" targetTag="board"/>;
        this.openMenu(contents);
    }

    openMenuSolutions = (event) => {
        const contents = <ItemList category="solution" Item={Symbol} tag="symbol" targetTag="board"/>;
        this.openMenu(contents);
    }
    
    render() { 
        return (
            <Container>
                <Button className="fixed-action-btn horizontal">
                    <span className="btn-floating btn-large red">
                        <Icon type="menu"/>
                    </span>
                    <ul>
                        <li>
                            <span className="btn-floating">
                                <Icon type="help"/>
                            </span>
                        </li>                        
                        <li>
                            <span className="btn-floating blue draken-1">
                                <Icon type="create" onClick={this.openMenuPost}/>
                            </span>
                        </li>
                        <li>
                            <span className="btn-floating red darken-1">
                                <Icon type="sentiment_very_dissatisfied" onClick={this.openMenuConflicts}/>
                            </span>
                        </li>
                        <li>
                            <span className="btn-floating yellow darken-1">
                                <Icon type="sentiment_very_satisfied" onClick={this.openMenuSolutions}/>
                            </span>
                        </li>
                        <li>
                            <span className="btn-floating blue">
                                <Icon type="lock_open" onClick={this.props.onLogout} />
                            </span>
                        </li>
                    </ul>
                </Button>
                {this.state.menu}
            </Container>
        );
    };
};

export default Menu;