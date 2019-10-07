import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../image/logo.png';
export class HomePage extends Component {

    render() {
        return (
            <div className="bgimg">
                <img src={logo}/>
                <div className="FormContainer" >
                    <div 
                        className="button">
                        <Link to="/dashboard">
                            <button
                                style={{
                                    width: '300px',
                                    height: '150px',
                                    fontSize: '70px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'wheat',
                                    marginLeft: '200px',
                                    marginTop: '60px',
                                    borderRadius: '30px',
                                    }}
                                id="play">
                                Start
                            </button>
                        </Link>
                        <Link to="/Help">
                            <button
                                style={{
                                    width: '400px',
                                    height: '60px',
                                    fontSize: '40px',
                                    backgroundColor: 'wheat',
                                    marginLeft: '150px',
                                    marginTop: '80px',
                                    borderRadius: '20px',
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
