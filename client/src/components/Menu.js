import React, { Component } from 'react';
import styled from 'styled-components';
import Materialize from 'materialize-css';

import { Icon, ItemList, Post, Symbol } from 'components';

const Container = styled.div`    
    position: fixed;
    top: 0px;
    right: 0px;
    display: inline-block;
    z-index: 2;
`;
 
const Button = styled.div`
    top: 0px;
    right: 0px;
    height: 60px;
    margin: 15px;     
`;
 
class Menu extends Component {
    constructor(props) {
        super(props); 

        this.state = { 
            isOpened: false,
            content: null
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

    action1 = (event) => {
        const content = <ItemList category="post" Item={Post} targetTag="board"/> 

        this.setState({
            isOpened: true,
            content: content
        });
        document.addEventListener('mousedown', this.closeMenu);
    }

    action2 = (event) => {
        const content = <ItemList category="symbol" Item={Symbol} targetTag="board"/> 

        this.setState({
            isOpened: true,
            content: content
        });
        document.addEventListener('mousedown', this.closeMenu);
    }

    closeMenu = (event) => {
        this.setState({
            isOpened: false,
            content: null
        });
        document.removeEventListener('mousedown', this.closeMenu);
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
                                <Icon type="help" />
                            </span>
                        </li>
                        <li>
                            <span className="btn-floating red darken-1">
                                <Icon type="sentiment_very_dissatisfied" onClick={this.action1} />
                            </span>
                        </li>
                        <li>
                            <span className="btn-floating yellow darken-1">
                                <Icon type="sentiment_very_satisfied" onClick={this.action2} />
                            </span>
                        </li>
                        <li>
                            <span className="btn-floating blue">
                                <Icon type="lock_open" onClick={this.props.onLogout} />
                            </span>
                        </li>
                    </ul>
                </Button>
                {this.state.content}
            </Container>
        );
    };
};

export default Menu;