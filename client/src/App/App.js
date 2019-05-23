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

    console.log(this.state.container);

    for(let key in ImageLoader) {
      symbols.push(<Symbol image={ImageLoader[key]} setContainer={this.setContainer} key={key}/>)
    }

    return (      
      <div>
        <Symbols>
          {symbols}
        </Symbols>
        <Board row={15} col={20} setContainer={this.setContainer} container={this.state.container} />
      </div>
    );
  }
}


export default App;