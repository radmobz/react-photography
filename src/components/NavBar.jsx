import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sample from './Sample';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar  solid dark">
                    <div className="navbar-header">
                        <div className="basic-wrapper">
                            <div className="navbar-brand"> <a onClick={() => console.log('coucou')} href="#"><img src="#" srcSet="style/images/logo.png 1x, style/images/logo@2x.png 2x" className="logo-light" alt="" /><img src="#" srcSet="style/images/logo-dark.png 1x, style/images/logo-dark@2x.png 2x" className="logo-dark" alt="" /></a> </div>
                            <a className="btn responsive-menu" data-toggle="collapse" data-target=".navbar-collapse"><i></i></a>
                        </div>
                    </div>
                    <div className="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/#">
                                Accueil
                            </Link></li>
                            <li><Link to="/perso">
                                Espace Perso
                            </Link></li>
                        </ul>
                    </div>
                    <div className="social-wrapper">
                        <ul className="social naked">
                            <li><a href="#"><i className="icon-s-facebook"></i></a></li>
                            <li><a href="#"><i className="icon-s-twitter"></i></a></li>
                            <li><a href="#"><i className="icon-s-flickr"></i></a></li>
                            <li><a href="#"><i className="icon-s-instagram"></i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
