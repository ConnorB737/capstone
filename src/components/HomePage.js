import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../image/logo.png';
export class HomePage extends Component {

    render() {
        return (

            <div className="bgimg">
                <img src={logo}/>

                <div className="white"  style={{
                    width: '700px',
                    height: '370px',
                    backgroundColor: 'white',
                    marginLeft: '420px',
                    marginTop: '20px',
                    borderRadius: '10%'
                }}>
                    <div className="button">
                        <Link to="/dashboard">
                            <button
                                style={{
                                    width: '580px',
                                    height: '120px',
                                    fontSize: '50px',
                                    backgroundColor: 'wheat',
                                    marginLeft: '78px',
                                    marginTop: '36px'
                                }}
                                id="play">Play</button>
                        </Link>
                        <Link to="/Help">
                            <button
                                style={{
                                    width: '580px',
                                    height: '120px',
                                    fontSize: '50px',
                                    backgroundColor: 'wheat',
                                    marginLeft: '78px',
                                    marginTop: '36px'
                                }}id="check">Check Rules</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}
