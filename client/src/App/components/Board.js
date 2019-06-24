import React from 'react';
import styled from 'styled-components';
import * as Utility from '../lib/Utility';
import tile from '../resources/tile.jpg';
import DropZone from './DropZone';

const Main = styled.div`
    position: absolute;
    top: ${props => props.rect.top}px;
    left: ${props => props.rect.left}px;
    width: ${props => props.rect.width}px;
    height: ${props => props.rect.height}px;
    border: solid 2px;
    box-shadow: 5px 5px 8px 4px rgba(0, 0, 0, 0.5);
`;

const Tile = styled.div`
    float: left;
    line-height: 0px;
`;

function Board({left, top, row, col, items}) {
    const offsetX = 50;
    const offsetY = 50;
    const rect = {
        left: left,
        top: top,
        width: col * offsetX,
        height: row * offsetY
    };

    let convertedItems = Utility.ConvertToHTML(items);    
    return (
        <DropZone tag="board" rect={rect}>
            <Main rect={rect}>
                <Tiles offsetX={offsetX} offsetY={offsetY} row={row} col={col} />
            </Main>
            <div dangerouslySetInnerHTML={{ __html: convertedItems }} />
        </DropZone>
    );
}

function Tiles({offsetX, offsetY, row, col}) {
    let tiles = [];
    for (let i = 0; i < row * col; ++i) {
        tiles.push(<img
            src={tile} width={offsetX} height={offsetY} 
            key={i} alt="tile" draggable="false" />);
    }

    return (
        <Tile>
            {tiles}
        </Tile>
    );
}

export default Board; 


/*

    GetObjects = async () => {
        //const objects = await this.CallApi();
        //this.props.setContainer(objects);
    }

    CallApi = () => {
    }
*/