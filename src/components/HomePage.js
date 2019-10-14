import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../image/logo.png';
export class HomePage extends Component {

    render() {
        return (
            <div>
                 <img src={logo} style={{width:'520px',height:'170px'}}/>
                <div className="FormContainer" >
                    <div 
                        className="button">
                        <Link to="/dashboard">
                            <button
                                style={{
                                    width: '20vw',
                                    height: '9vw',
                                    fontSize: '4.5vw',
                                    fontWeight: 'bold',
                                    backgroundColor: 'wheat',
                                    marginLeft: '10vw',
                                    marginTop: '3vw',
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
                                    marginTop: '4vw',
                                    borderRadius: '40px',
                                    backgroundColor: 'wheat',
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
