import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import background from 'resources/main/PNG/board-paper.png';

const OutContainer = styled.div`
    width: ${window.screen.width}px;
    height: ${window.screen.height}px;
    overflow-x: scroll;
    overflow-y: hidden;
    ::-webkit-scrollbar { display: none; }
`;

const InContainer = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${window.screen.height * 0.96}px;
    background-image: url(${background});
    background-size: contain;
    background-repeat: repeat-x;
`;

const DropZone = styled.div`
    position: absolute;
    top: 40%;
    width: ${props => props.width}px;
    height: ${window.screen.height * 0.75}px;
    transform: translate(0, -40%);
`;

class Board extends Component {
    constructor(props) {
        super(props);

        this.ref = null; 
        this.state = {
            scrollLeft: 0,
            width: window.screen.width * 2,
            items: null,
            contents: null
        };
    }

    handleWheel = (event) => {
        const delta = event.nativeEvent.wheelDelta;
        const maxScrollLeft = this.ref.scrollWidth - this.ref.clientWidth;
        let boardWidth = this.state.width;

        this.ref.scrollLeft -= delta;
        if (maxScrollLeft * 0.8 < this.ref.scrollLeft) {
            boardWidth += window.screen.width;
        }

        this.setState({ 
            width: boardWidth,
            scrollLeft: this.ref.scrollLeft 
        });
    } 

    static getDerivedStateFromProps(nextProps, prevState) {
        const items = nextProps.items;
        const contents = items.map(item => {
            const itemLeft = parseInt(item.getIn(['info', 'left']), 10);
           
            if (prevState.scrollLeft - window.screen.width < itemLeft
                && itemLeft < prevState.scrollLeft + window.screen.width) return item.get('content');
            else return null;
        });

        return { items: items, contents: contents };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextState) !== JSON.stringify(this.state);
    } 

    render() {
        const { width, contents } = this.state;

        return (
            <OutContainer ref={r => this.ref = r} onWheel={this.handleWheel}>
                <InContainer width={width}>
                    <DropZone className="board" width={width}>
                        {contents}
                    </DropZone>
                </InContainer>
            </OutContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const items = state.item.get('items');

    return {
        items: items.get('posts').concat(items.get('symbols'))
    };
};

export default connect(mapStateToProps, null)(Board);