import React, { Component } from 'react';
import styled from 'styled-components';
import { Timer, Like, TextBox } from 'components';

import { connect } from 'react-redux';

const Content = styled.div`
    position: relative;
    cursor: pointer;
    display: inline-block;  
`; 

const Background = styled.img`
    width: ${props => props.width}px;
    height:  ${props => props.height}px;
`;

class Post extends Component {
    constructor(props) {
        super(props);

        this.ref = null;

        this.originWidth = props.mode ? 200 : 100;
        this.originHeight = props.mode ? 200 : 100;

        this.state = {
            width: this.originWidth,
            height: this.originHeight,
            isHover: false,
            isOpened: false
        }
    }

    closePost = (event) => {
        if(this.ref.contains(event.target)) return false;

        this.ref.setAttribute('style', 'cursor: pointer; z-index: 0;');
        this.setState({
            width: this.originWidth,
            height: this.originHeight,
            isOpened: false
        });
        document.removeEventListener('mousedown', this.closePost);
    }

    handleClick = (event) => {  
        if (this.state.isOpened) return false;

        this.ref.setAttribute('style', 'cursor: default; z-index: 1;');
        this.setState({
            width: this.state.width * 2.0,
            height: this.state.height * 2.0,
            isOpened: true
        });
        document.addEventListener('mousedown', this.closePost);
    }

    handleMouseEnter = (event) => {
        if(this.props.isDragging) return false;
        
        this.setState({ isHover: true });
    }
    
    handleMouseOut = (event) => {
        this.setState({ isHover: false });
    }

    renderUI = () => {
        const { isHover, isOpened } = this.state;
        let ui = null;

        const { created, likes, text } = this.props;

        if(isHover) {
            if(isOpened) {
                ui =
                    <div>
                        <Timer created={created}/>
                        <TextBox text={text} mode={true} postId={this.ref.id}/>
                        <Like likes={likes} postId={this.ref.id}/>
                        <span onClick={() => {
                            window.location.href = `/post/${this.ref.id}`;
                        }}>view</span>
                    </div>;
            }
            else {
                ui =
                    <div>
                        <Timer created={created}/>
                        <Like likes={likes} postId={this.ref.id}/>
                    </div>;
            }
        }
        else {
            if(isOpened) {
                ui =
                    <div>
                        <Timer created={created}/>
                        <TextBox text={text} mode={true} postId={this.ref.id}/>
                        <Like likes={likes} postId={this.ref.id}/>
                        <span onClick={() => {
                            window.location.href = `/post/${this.ref.id}`;
                        }}>view</span>
                    </div>;
            }
            else {                
                ui =
                    <div>
                        <TextBox text={text} mode={false}/>
                    </div>;
            }
        }
        
        return ui;
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closePost);
    }
    
    render() {
        const { id, mode, image } = this.props;
        
        const backgroundIMG =
            <Background 
                src={image} draggable="false"
                width={this.state.width} height={this.state.height}
            />;
        const deactivated =
            <Content id={id} className="post" ref={(r) => this.ref = r}>
                { backgroundIMG }
            </Content>;            
        const activated =
            <Content 
                id={id} className="post" ref={(r) => this.ref = r}
                onClick={this.handleClick} 
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseOut}>
                { backgroundIMG }
                { this.renderUI() } 
            </Content>;

        return mode ? activated : deactivated;
    }
}

const mapStateToProps = (state) => {
    return {
        isDragging: state.drag.get('isDragging')
    };
};

export default connect(mapStateToProps, null)(Post);