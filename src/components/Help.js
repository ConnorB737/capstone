import React, { Component } from 'react';
import logo from '../image/logo.png';
// import BScroll from 'better-scroll';
import rule1 from '../image/rule1.jpg';
import rule2 from '../image/rule2.jpg';
import {Link} from "react-router-dom";
import { relative } from 'path';


export class Help extends Component {

    render() {
        return (
            <div>
                <div 
                    style={{ 
                        width: '1000px',
                        margin: '0 auto',
                        }}>
                    <div 
                        style={{
                            width: '100%',
                            textAlign: 'center'
                            }}>                
                        {/* <img src={logo}/> */}
                    </div>
                    <div
                        style={{
                            width: '900px',
                            margin: '0 auto',
                            }}>
                        <img 
                            style={{
                                margin: '10px',
                                width:'400px',
                                height:'500px',
                                float: 'left',
                                borderRadius:'10%',
                                boxShadow:"8px 8px 8px 0 #25170e"
                                }} 
                            src={rule1}/>
                        <img 
                            style={{
                                margin: '10px',
                                width:'400px',
                                height:'500px',
                                borderRadius:'10%',
                                float: 'left',
                                boxShadow:"8px 8px 8px 0 #25170e"
                                }} 
                            src={rule2}/>
                    </div>
                    <div 
                        style={{
                            width: '350px',
                            height: '60px',
                            margin: '0 auto',
                            }}>
                        <Link to="/login">
                            <button
                                style={{
                                    width: '150px',
                                    height: '40px',
                                    backgroundColor: 'lightgrey',
                                    left: '10px',
                                    fontSize:'20px',
                                    borderRadius: '20px',
                                    margin: '10px',
                                    }}>
                                Start
                            </button>
                        </Link>
                        <Link to="/">
                            <button
                                style={{
                                    width: '150px',
                                    height: '40px',
                                    backgroundColor: 'lightgrey',
                                    right: '10px',
                                    fontSize:'20px',
                                    borderRadius: '20px',
                                    margin: '10px',
                                    }}>
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}
