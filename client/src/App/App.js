import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Board from './components/Board';
import PostIt from './components/PostIt';
import Symbols from './components/Symbols';


const SymbolBox = styled.div`
  position: absolute;
  top: 50px;
  left: 1100px;
  width: 300px;
  height: 600px;
  border: solid;
  border-width: 1px;
  overflow-y: scroll;
`;

const PostBox = styled.div`
  position: absolute;
  top: 50px;
  left: 1450px;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Board row={10} col={15} />
      </div>
    );
  }
}

export default App;

/*



<!DOCTYPE html>

<html>
<head>
    <title>Storytelling Card Game</title>
    <style>
        
    </style>
    <script src="DragAndDrop.js" ></script>
</head>
<body>
    <img src="symbol_1.png" class="symbol1" onmousedown="startDrag(event, this)">
    <img src="symbol_2.png" class="symbol2" onmousedown="startDrag(event, this)">
    <img src="symbol_3.png" class="symbol3" onmousedown="startDrag(event, this)">
    <img src="symbol_4.png" class="symbol4" onmousedown="startDrag(event, this)">
    
    <textarea id="inputBox"></textarea>
    <input type="button" id="inputButton" value="Post it" onclick="AddTextBox()">

    <div id="board"></div>
</body>
</html>
*/