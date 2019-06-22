import React, { Component } from 'react';
import styled from 'styled-components';
import tileImg from '../resources/tile.jpg';
import DropZone from './DropZone';

const Main = styled.div`
    position: absolute;
    top: ${props => props.rect.top}px;
    left: ${props => props.rect.left}px;
    width: ${props => props.rect.width}px;
    height: ${props => props.rect.height}px;
    border: solid;
    border-width: 2px;
    box-shadow: 5px 5px 8px 4px rgba(0, 0, 0, 0.5);
`;

const Background = styled.div`
    float: left;
    line-height: 0px;
`;

class Board extends Component {
    constructor(props) {
        super(props);

        this.state= {
            background: [],
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        }
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

    ConvertToHTML = (elements) => {
        let html = '';
        elements.map((element) => {
            return (
                html += element.outerHTML);
        })

        return html;
    }

    GetObjects = async () => {
        //const objects = await this.CallApi();
        //this.props.setContainer(objects);
    }

    CallApi = () => {
    }
    
    render() {
        let items = this.ConvertToHTML(this.props.items);

        const rect  = {
            left: 50,
            top: 50,
            width: this.state.width,
            height: this.state.height
        };        

        return (  
            <DropZone tag="board" rect={rect}>
                <Main rect={rect}>
                    {this.state.background}
                </Main>
                <div dangerouslySetInnerHTML={{ __html: items }} />
            </DropZone>
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
        const size = this.state.row * this.state.col;

        for(let i = 0; i < size; ++i) {
            temp.push(<img src={tileImg} width={offsetW} height={offsetH} key={i} alt="tile" draggable="false" />);
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