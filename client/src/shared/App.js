import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Main, SignIn, SignUp } from 'containers';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Main}/>
        <Route path="/post/:postId" component={Main}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
      </div>
    );
  };
};

export default App;