import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Title, Main, Tutorial, Credit, SignIn, SignUp } from 'containers';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Title}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Switch>
          <Route path="/main" component={Main}/>
          <Route path="/main/:postId" component={Main}/>
        </Switch>
        <Route path="/tutorial" component={Tutorial}/>
        <Route path="/credit" component={Credit}/>
      </div>
    );
  };
};

export default App;