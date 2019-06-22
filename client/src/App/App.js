import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './components/Board';
import Symbol from './components/Symbol';
import PostIt from './components/PostIt';
import ImageLoader from './lib/ImageLoader'; 
import Pattern from './data/Pattern.json';

const Symbols = styled.div`
  position: absolute;
  top: 50px;
  left: 1100px;
`;

const ButtonBox = styled.form`
  position: absolute;
  top: 850px;
  left: 950px;
`;

const Button = styled.button`
  border: 1px solid;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  
  &:hover {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
`;

const PostBox = styled.div`
  position: absolute;
  top: 50px;
  left: 1300px;
`;

const Main = styled.div`
  user-select: none;
  marigin:auto;
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    };

    this.condition = {};
    this.originPos = []; 
  }

  componentWillMount() {
    this.condition = Object.assign({}, Pattern.condition);
    for(let type in this.condition) this.condition[type] = 0;
  }

  addItem = (element) => {  
    const content = element.firstChild; 
    const type = content.className.split(' ', 1);
    ++this.condition[type];  
    this.originPos.push({
      "left": element.style["left"],
      "top":element.style["top"],
      "right": element.style["right"],
      "bottom": element.style["bottom"]
    });
    element.id = this.state.items.length;
    this.setState({
      items: [
        ...this.state.items,
        element
      ]
    })
  }

  setItems = (elements) => {
    for(let type in this.condition) this.condition[type] = 0; 
    for(let item of this.state.items) {    
      const content = item.firstChild; 
      const type = content.className.split(' ', 1);
      ++this.condition[type];
    }
    this.setState({
      items: elements
    })
  }

  Back = (e) => {
    e.preventDefault();
    
    let items = this.state.items.slice();
    for(let index in items) {     
      items[index].style["left"] = this.originPos[index].left;
      items[index].style["top"] = this.originPos[index].top;
      items[index].style["right"] = this.originPos[index].right;
      items[index].style["bottom"] = this.originPos[index].bottom;
    }
    this.setItems(items);
  }

  Draw = (e) => { 
    e.preventDefault();
    const condition = Pattern.condition;   
    for(let type in condition) {
      if(this.condition.hasOwnProperty(type)) {
        if(this.condition[type] < condition[type]) {         
          console.log('Draw normal Pattern');
          //return;
        }
      }
    }
     
    const position = Pattern.position;
    let items = this.state.items.slice();    
    for(let index in items) {
      if(position[index] == undefined) break;
      
      items[index].style["left"] = position[index].left + 'px';      
      items[index].style["top"] = position[index].top + 'px';
      items[index].style["right"] = parseInt(items[index].style["left"])
      + parseInt(items[index].style["width"]) + 'px'; 
      items[index].style["bottom"] = parseInt(items[index].style["top"])
      + parseInt(items[index].style["height"]) + 'px';
    }
    this.setItems(items);
  }

  test = (e) => {
    console.log(e.clientX, e.clientY);
  }

  render() {
    let symbols = [];

    for(let key in ImageLoader) {
      ImageLoader[key].forEach((image) =>{
        symbols.push(<Symbol
          image={image} addItem={this.addItem} type={key} key={symbols.length}/>);
      });
    }
  
    document.addEventListener('mousedown', this.test);

    return (      
      <Main>
        <Board row={15} col={20} setItems={this.setItems} items={this.state.items} />
        <ButtonBox>
            <Button onClick={this.Back}>Back</Button>
            <Button onClick={this.Draw}>Draw</Button>
        </ButtonBox>
        <Symbols>
          {symbols}
        </Symbols>
        <PostBox>
          <PostIt setItems={this.setItems} addItem={this.addItem} items={this.state.items} />
        </PostBox>
      </Main>
    );
  }
}


export default App;