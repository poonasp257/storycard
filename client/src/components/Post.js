import React, { Component } from 'react';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';
import { Timer, Like, Count } from 'components';

const Content = styled.div`
    position: relative;
    cursor: pointer;
    display: inline-block;  
`; 

const Background = styled.img`
    width: ${props => props.width}px;
    height:  ${props => props.height}px;
    :hover {
        filter: black;
    }
`;

const Text = styled.textarea`
    position: absolute;
    left: 10px;
    top: 50px;    
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border: 0;
    resize: none;
    :focus {
        outline: none;
    }
`;

class Post extends Component {
    constructor(props) {
        super(props);

        this.IsOpened = false;
        this.ref = null;

        this.originWidth = props.mode ? 200 : 100;
        this.originHeight = props.mode ? 200 : 100;

        this.state = {
            width: this.originWidth,
            height: this.originHeight,
            description: 'Posting...'
        }
    }

    closePost = (event) => {
        if(this.ref.contains(event.target)) return false;

        this.IsOpened = false;
        this.setState({
            width: this.originWidth,
            height: this.originHeight
        });
        document.removeEventListener('mousedown', this.closePost);
    }

    handleClick = (event) => {  
        if (this.IsOpened) return false;

        this.IsOpened = true;
        this.setState({
            width: this.state.width * 3.0,
            height: this.state.height * 3.0
        });
        document.addEventListener('mousedown', this.closePost);
    }

    renderUI = () => {
        const description = this.state.description;
        return (
            <div>
                <Timer/>
                <Like/>
                { this.IsOpened ? 
                    <Text defaultValue={description}/> : 
                    <LinesEllipsis text={description} maxLine='3' ellipsis='...' basedOn='letters'/> }
                { this.IsOpened ? <Count/> : null }
            </div>
        );
    }

    render() {
        return (
            <Content className="post" onClick={this.handleClick} ref={(c) => this.ref = c}>
                <Background 
                    src={this.props.image} 
                    draggable="false"
                    width={this.state.width}
                    height={this.state.height}
                />
                { this.props.mode ? this.renderUI() : null }
            </Content>
        );
    }
}

export default Post;


// <LinesEllipsis
// text={'hello worldsadasdasdasdasdasdasasd'}
// maxLine='2'
// ellipsis='...'
// basedOn='letters'
// />

// componentDidUpdate() {
//     const board = document.getElementsByClassName('board');
//     const texts = board[0].getElementsByTagName('textarea');

//     for (let text of texts) {
//         text.removeAttribute('readOnly');
//         text.addEventListener('change', this.OnChange);
//         //text.addEventListener('keydown', this.OnKeyDown);
//     }
// }

// OnChange = (e) => {
//     let items = this.props.items.slice();
//     for (let item of items) {
//         if (item.id !== e.target.closest('div').id) continue;

//         let texts = item.getElementsByTagName('TEXTAREA');
//         for (let text of texts) {
//             text.value = e.target.value;
//             text.innerHTML = e.target.value;
//             this.setState({
//                 type: 'D'
//             });
//         }
//         break;
//     }
//     this.props.setItems(items);
// }