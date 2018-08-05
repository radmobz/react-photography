import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './NavBar'
import Main from './Main';

//<Route exact path="/" component={Sample} />

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="preloader"><div className="textload">Loading</div><div id="status"><div className="spinner"></div></div></div>
        <main className="body-wrapper">
          <NavBar openPortfolio={this.openPortfolio} openSlider={this.openSlider} />
          <Main />
        </main>
      </div>
    );
  }
}
