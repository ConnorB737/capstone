import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class HomePage extends Component {

    render() {
        return (
            <div>
                <img src="logo.png"/>

                <div className="white">
                    <div className="button">
                        <Link to="/dashboard">
                            <button id="play">Play</button>
                        </Link>
                        <Link to="help.html">
                            <button id="check">Check Rules</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}
