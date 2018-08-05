import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from './NavBar'
import Sample from './Sample'

//<Route exact path="/" component={Sample} />

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isSlider: true,
      isPerso: false,
      isContact: false,
      isPortfolio: false,
      isBlog: false,
    }

    this.clearAll = this.clearAll.bind(this)
    this.openSlider = this.openSlider.bind(this)
    this.openPortfolio = this.openPortfolio.bind(this)
  }

  openPortfolio() {
    this.clearAll()
    this.setState({isPortfolio: true})
  }

  openSlider() {
    this.clearAll()
    this.setState({isSlider: true})
  }

  clearAll() {
    this.setState({
      isSlider: false,
      isPerso: false,
      isContact: false,
      isPortfolio: false,
      isBlog: false,
    });
  }

  render() {
    return (
      <div>
        <div id="preloader"><div className="textload">Loading</div><div id="status"><div className="spinner"></div></div></div>
        <main className="body-wrapper">
          <NavBar />
          <Sample />
        </main>
      </div>
    );
  }
}
