import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import background from 'resources/PNG/board-paper.png';

const OutContainer = styled.div`
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    overflow-x: scroll;
    overflow-y: hidden;
    ::-webkit-scrollbar { display: none; }
`;

const InContainer = styled.div`
    position: relative;
    width: ${props => props.width}px;
    height: ${window.innerHeight}px;
    background: url(${background}) repeat-x;
    background-size: contain;
`;

const DropZone = styled.div`
    position: absolute;
    top: 40%;
    width: ${props => props.width}px;
    height: ${window.innerHeight * 0.75}px;
    transform: translate(0, -40%);
`;

class Board extends Component {
    constructor(props) {
        super(props);

        this.ref = null;
        this.state = {
            scrollLeft: 0,
            width: window.innerWidth * 2,
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
            boardWidth *= 2;
        }

        this.setState({ 
            width: boardWidth,
            scrollLeft: this.ref.scrollLeft 
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const items = nextProps.items;
        let contents = [];

        items.map(item => {
            const itemLeft = parseInt(item.getIn(['info', 'left']), 10);
            
            if (prevState.scrollLeft - window.innerWidth < itemLeft
                && itemLeft < prevState.scrollLeft + window.innerWidth) {
                contents.push(item.get('content'));
            }
        });

        return { items: items, contents: contents };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextState) != JSON.stringify(this.state);
    }

    render() {
        return (
            <OutContainer ref={r => this.ref = r} onWheel={this.handleWheel}>
                <InContainer width={this.state.width}>
                    <DropZone className="board" width={this.state.width}>
                        {this.state.contents}
                    </DropZone>
                </InContainer>
            </OutContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.post.get('items')
    };
};

export default connect(mapStateToProps, null)(Board);