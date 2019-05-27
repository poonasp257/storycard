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
      container: []
    };
  }

  setContainer = (element) => {
    this.setState({
      container: [
        ...this.state.container,
        element
      ]
    })
  }

  render() {
    let symbols = [];

    for(let key in ImageLoader) {
      symbols.push(<Symbol image={ImageLoader[key]} setContainer={this.setContainer} key={key} />)
    }

    return (      
      <Main>
        <Board row={15} col={20} setContainer={this.setContainer} container={this.state.container} />
        <Symbols>
          {symbols}
        </Symbols>
        <PostBox>
          <PostIt setContainer={this.setContainer} />
        </PostBox>
      </Main>
    );
  }
}


export default App;