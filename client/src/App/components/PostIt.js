import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const Content = styled.textarea`
    width: 200px;
    height: 200px;
    border: solid;
    border-width: 1px;
    box-shadow: 5px 5px 8px 4px rgba(0, 0, 0, 0.5);
    background-color: #BAECFF;
    font-size: 1.5em;
    resize: none;
`;

class PostIt extends Component {
    constructor(props) {
        super(props);

        this.items = null;
        this.maxLength = 0;
    }

    componentWillReceiveProps(nextProps) {
        this.items = nextProps.items;
    }

    componentDidUpdate() {
        const board = document.getElementsByClassName('board');
        const texts = board[0].getElementsByTagName('textarea');

        for(let text of texts) {
            text.removeAttribute('readOnly');
            text.addEventListener('keydown', this.OnKeyDown);
            text.addEventListener('change', this.OnChange);
        }
    }    

    OnChange = (e) => {
        this.items = this.props.items;
        for(let item of this.items) {
            if(item.id !== e.target.closest('div').id) continue;

            let texts = item.getElementsByTagName('TEXTAREA');  
            for(let text of texts) {
                text.value = e.target.value;
                text.innerHTML = e.target.value;
                console.log(text.value.length)
            }
        }

        this.props.setItems(this.items);
    }
    
    render() {
        return (
            <Draggable tag="board" addItem={this.props.addItem} customEvent={this.OnChange}>   
                <form>
                    <Content readOnly onChange={this.OnChange} />
                </form>
            </Draggable>
        );
    }
}

export default PostIt; 