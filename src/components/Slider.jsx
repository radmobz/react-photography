import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Shootings from './Shootings'

export default class Slider extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        console.log('compo did mount')
    }

    render() {
        return (
            <div>
                <div className="post-parallax parallax inverse-wrapper parallax2" style={{ backgroundImage: 'url(style/images/art/parallax2.jpg)' }}>
                    <div className="container inner text-center">
                        <div className="headline text-center">
                            <h2>hello! Delphine, photographe.</h2>
                            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus facere accusantium, optio, recusandae et quibusdam praesentium animi nisi quisquam pariatur deleniti voluptatum eos aliquid, itaque aut veritatis impedit quidem. Error..</p>
                        </div>
                    </div>
                </div>
                <div id="sticky-filter" className="sticky-filter dark-wrapper container">
                    <ul>
                        <li><a href="#mariage">Mariage</a></li>
                        <li><a href="#grossesse">Grossesse</a></li>
                        <li><a href="#naissance">Naissance</a></li>
                        <li><a href="#enfants">Enfants / Famille</a></li>
                    </ul>
                </div>
                <Shootings />
            </div>
        );
    }
}


