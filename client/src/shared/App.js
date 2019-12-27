import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Title, Main, Tutorial, Credit, SignIn, SignUp, Popups } from 'containers';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Title}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/main" component={Main}/>
          <Route path="/tutorial" component={Tutorial}/>
          <Route path="/credit" component={Credit}/>
        </Switch>
        <Popups/>
      </div>
    );
  };
};

export default App;