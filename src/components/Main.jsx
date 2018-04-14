import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Sample from './Sample';

export default class Main extends Component {

  render() {
    return (
      <div>
          <Route exact path="/" component={Sample} />
      </div>
    );
  }
}
