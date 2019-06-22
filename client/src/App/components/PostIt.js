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
// stateless type으로 변경 예정
// onchange 방식 바꾼 후 componentDidUpdate 부분 삭제
class PostIt extends Component {
    componentDidUpdate() {
        const board = document.getElementsByClassName('board');
        const texts = board[0].getElementsByTagName('textarea');

        for(let text of texts) {
            text.removeAttribute('readOnly');
            text.addEventListener('change', this.OnChange);
            //text.addEventListener('keydown', this.OnKeyDown);
        }
    }    

    OnChange = (e) => {
        let items = Object.assign({}, this.props.items);
        for(let item of items) {
            if(item.id !== e.target.closest('div').id) continue;

            let texts = item.getElementsByTagName('TEXTAREA');  
            for(let text of texts) {
                text.value = e.target.value;
                text.innerHTML = e.target.value;
            }
            break;
        }
        this.props.setItems(items);
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