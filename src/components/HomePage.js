import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../image/logo.png';
export class HomePage extends Component {

    render() {
        return (
            <div>
                {/* <img src={logo}/> */}
                <div className="FormContainer" >
                    <div 
                        className="button">
                        <Link to="/dashboard">
                            <button
                                style={{
                                    width: '15vw',
                                    height: '10vw',
                                    fontSize: '5vw',
                                    fontWeight: 'bold',
                                    backgroundColor: 'wheat',
                                    marginLeft: '12.5vw',
                                    marginTop: '2vw',
                                    borderRadius: '40px',
                                    }}
                                id="play">
                                Start
                            </button>
                        </Link>
                        <Link to="/Help">
                            <button
                                style={{
                                    width: '20vw',
                                    height: '5vw',
                                    fontSize: '2vw',
                                    marginLeft: '10vw',
                                    marginTop: '5vw',
                                    borderRadius: '40px',
                                    backgroundColor: 'lightgrey',
                                    }}
                                id="check">
                                Check Rules
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}
