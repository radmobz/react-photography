import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export default class Slider extends Component {
    constructor(props) {
        super(props);
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
            </div>
        );
    }
}


