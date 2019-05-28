import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './components/Board';
import Symbol from './components/Symbol';
import PostIt from './components/PostIt';
import ImageLoader from './lib/ImageLoader';

const Symbols = styled.div`
  position: absolute;
  top: 50px;
  left: 1100px;
`;

const PostBox = styled.div`
  position: absolute;
  top: 50px;
  left: 1300px;
`;

const Main = styled.div`
  user-select: none;
`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    };
  }

  addItem = (element) => {
    this.setState({
      items: [
        ...this.state.items,
        element
      ]
    })
  }

  setItems = (elements) => {
    this.setState({
      items: elements
    })
  }
 
  render() {
    let symbols = [];

    for(let key in ImageLoader) {
      symbols.push(<Symbol image={ImageLoader[key]} addItem={this.addItem} key={key} />)
    }

    let items = this.state.items;
    for(let i = 0; i < items.length; ++i){
      items[i].id = i; 
    }
    
    return (      
      <Main>
        <Board row={15} col={20} setItems={this.setItems} items={this.state.items} />
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