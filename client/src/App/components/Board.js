import React, { Component } from 'react';
import styled from 'styled-components'
import tileImg from '../resources/tile.jpg'
import DropZone from './DropZone';

const Main = styled.div`
    position: absolute;
    top: 50px;
    left: 50px;
    width: ${props => props.width};
    height: ${props => props.height};
    border: solid;
    border-width: 1px;
    box-shadow: 5px 5px 8px 4px rgba(0, 0, 0, 0.5);
`;

const Background = styled.div`
    float: left;
    line-height: 0px;
`;

class Board extends Component {
    state = {
        background: [],
        items: [],
        width: 0,
        height: 0,        
    }

    componentWillMount() {        
        const offsetW = 50;
        const offsetH = 50;
        const row = this.props.row;
        const col = this.props.col;

        this.setState({
            background: [
                ...this.state.background,
                <Tile width={offsetW} height={offsetH} row={row} col={col} key={0}/> 
            ],
            width: col * offsetW,
            height: row * offsetH,
        });
        
        this.GetObjects();
    }
    
    GetObjects = async () => {
        const objects = await this.CallApi();
        this.setState ({
            ...this.state
        })
    }

    CallApi = () => {
        return(
            console.log('call api')
        );
    }

    render() {
        const boardWidth = this.state.width + 'px';
        const boardHeight = this.state.height + 'px';

        return (  
            <Main width={boardWidth} height={boardHeight}>
                {this.state.background}
                <DropZone >
                    {this.state.items}
                </DropZone>
            </Main>            
        );
    }
}

class Tile extends Component {
    state = {
        tiles: [],
        offsetWidth: this.props.width,
        offsetHeihgt: this.props.height,
        row: this.props.row,
        col: this.props.col
    }

    componentWillMount() {
        this.CreateTile();
    }

    CreateTile = () => {
        let temp = [];
        const offsetW  = this.state.offsetWidth;
        const offsetH  = this.state.offsetHeihgt; 
        const row = this.state.row;
        const col = this.state.col;

        for(let i = 0; i < row; ++i) {
            for(let j = 0; j < col; ++j) {
                temp.push(<img src={tileImg} width={offsetW} height={offsetH} />);
            }
            temp.push(<br />);
        }
        this.setState({ tiles: temp });
    }

    render() {
        return (
            <Background>
                {this.state.tiles}
            </Background>
        );
    }
}

export default Board; 