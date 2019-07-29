import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import tile from 'resources/tile.jpg';

const Main = styled.div`
    float: left;
    margin: 40px;
    background-image: url(${tile});
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border: 2px solid;
    box-shadow: 3px 3px 5px 2px rgba(0, 0, 0, 0.35);
`;

class Board extends Component {
    constructor(props) {
        super(props);

        this.width = window.screen.width * 0.6;
        this.height = window.screen.height * 0.662;
    }

    render() {      
        return (
            <Main width={this.width} height={this.height} className="board">
                {this.props.items}
            </Main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.itemManager.items
    };
};

export default connect(mapStateToProps, null)(Board);