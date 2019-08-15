import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import tile from 'resources/tile.jpg';

const Main = styled.div`
    background-image: url(${tile});
    width: ${window.screen.width * 0.9}px;
    height: ${window.screen.height * 0.7}px;
    border: 2px solid;
    box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.35); 
    display: inline-block;
`;

class Board extends Component {
    render() {  
        return (
            <Main className="board">
                {this.props.items}
            </Main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.post.get('items')
    };
};

export default connect(mapStateToProps, null)(Board);