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
    overflow: hidden;
    maxlength: 50;
`;

class PostIt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
        };
    }

    onChange = (event) => {
        console.log('change');
    }
    
    render() {
        return (
            <Draggable tag="board" setContainer={this.props.setContainer}>   
                <Content value={this.state.text} onChange={this.onChange}> </Content>
            </Draggable>
        );
    }
}

export default PostIt; 