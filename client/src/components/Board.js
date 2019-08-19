import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import ReactSVG from 'react-svg';
import background from 'resources/SVG/boardBackground.svg';
import boardLeft from 'resources/SVG/boardLeft.svg';
import boardLeftHover from 'resources/SVG/boardLeftHover.svg';
import boardRight from 'resources/SVG/boardRight.svg';
import boardRightHover from 'resources/SVG/boardRightHover.svg';

import { Post } from 'components';

const Container = styled.div`
    margin-top: 80px;
`;

const Side = styled(ReactSVG)`
    width: 38.9px; 
    display: inline-block;
    cursor: pointer; 
`;

const Content = styled.div`
    display: inline-block;
`;

const Background = styled(ReactSVG)`
    width: 950px; 
`;

// const Item = styled.div`
//     position: absolute;
//     left: 600px;
//     top: 300px;
// `;


// <Item>
// <Post resource="green" mode={true} likes={[]}/>
// </Item>

class Board extends Component {
    render() {   
        return (
            <Container>
                <BoardSide normal={boardLeft} hover={boardLeftHover}/>
                <Content className="board">
                    <Background src={background}/>
                    {this.props.items}
                </Content>
                <BoardSide normal={boardRight} hover={boardRightHover}/>
            </Container>
        );
    }
}

class BoardSide extends Component {
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
            <Side src={image}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={handleClick}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.post.get('items')
    };
};

export default connect(mapStateToProps, null)(Board);