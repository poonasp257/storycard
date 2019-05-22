import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './components/Board';
import Symbol from './components/Symbol';
import ImageLoader from './lib/ImageLoader';

const Symbols = styled.div`
  position: absolute;
  top: 50px;
  left: 800px;
  width: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

class App extends Component {
  state = {
    container: []
  }

  componentDidMount() {
    console.log(this.state.container)
  }

  render() {
    let symbols = [];
          
    for(let key in ImageLoader) {
      symbols.push(<Symbol image={ImageLoader[key]} target={this.state.container} />)
    }

    return (      
      <div>
        <Symbols>
          {symbols}
        </Symbols>
        <Board row={15} col={20} target={this.state.container} />
      </div>
    );
  }
}


export default App;