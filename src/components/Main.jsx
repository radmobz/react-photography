import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Sample from './Sample';
import Slider from './Slider'

//<Route exact path="/" component={Sample} />

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Slider} />
        <Route exact path='/perso' component={Sample} />
      </Switch>
    );
  }
}
