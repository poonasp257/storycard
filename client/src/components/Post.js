import React, { Component } from 'react';
import styled from 'styled-components';
import { Timer, Like, TextBox } from 'components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
 
const Container = styled.div`
    position: relative;
    cursor: pointer;
    display: inline-block; 
    margin: 30px;
    color: #fefae7;
`;

const Background = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: ${props => props.color};
`;

const Interface = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
`;

const StyledLink = styled(Link)`
    position: absolute;
    right: 30px;
    bottom: 30px;
`;

class Post extends Component {
    constructor(props) {
        super(props);

        this.ref = null;
        this.originWidth = props.mode ? 180 : 60;
        this.originHeight = props.mode ? 180 : 60;

        this.state = {
            width: this.originWidth,
            height: this.originHeight,
            isHover: false,
            isOpened: false
        }
    }

    closePost = (event) => {
        if (this.ref.contains(event.target)) return false;

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
        if (this.props.isDragging) return false;

        this.setState({ isHover: true });
    }

    handleMouseLeave = (event) => {
        this.setState({ isHover: false });
    }

    renderUI = () => {
        const { isHover, isOpened } = this.state;
        const { id, created, likes, text } = this.props;
        const path = `/post/${id}`;
        let ui = (
            <Interface>
                <Timer created={created} mode={true}/>
                <TextBox text={text} mode={true} postId={id}/>
                <Like likes={likes} postId={id} mode={true}/>
                <StyledLink to={path}>view</StyledLink>
            </Interface>
        );

        if (!isOpened) {
            if (isHover) {
                ui = (
                    <Interface>
                        <Timer created={created} mode={false}/>
                        <Like likes={likes} postId={id} mode={false}/>
                    </Interface>
                );
            }
            else {
                ui = (
                    <Interface>
                        <TextBox text={text} mode={false}/>
                    </Interface>
                );
            }
        }

        return ui;
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closePost);
    }

    render() {
        const { id, mode, resource } = this.props;
        const { width, height } = this.state;        
        const background = (
            <Background width={width} height={height} color={resource} />
        );
        const deactivated = (
            <Container>
                {background}
            </Container>
        );
        const activated = (
            <Container id={id} className="post" ref={(r) => this.ref = r} onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {background}
                {this.renderUI()}
            </Container>
        );

        return mode ? activated : deactivated;
    }
}

const mapStateToProps = (state) => {
    return {
        isDragging: state.drag.get('isDragging')
    };
};

export default connect(mapStateToProps, null)(Post);