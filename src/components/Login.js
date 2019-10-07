import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../image/logo.png';


export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.login = this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        this.props.login(this.props.main.socket, this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="bgimg">
                <div 
                    style={{positive:'relative'}}>
                    <img 
                        src={logo} 
                        style={{
                            positive:'relative',
                            marginLeft: '555px'
                            }}/>
                    <div className="FormContainer">
                        <h1 
                            style={{ 
                                positive:'relative',
                                marginTop:'20px',
                                marginLeft: '300px'}} >
                            Login
                        </h1>
                        <form action="#" method="post">
                            <p 
                                style={{
                                    positive:'relative',
                                    marginLeft: '150px',
                                    marginTop: '0px',
                                    fontSize:'24px',
                                    }}>
                                Email
                            </p>
                            <input 
                                style={{
                                    positive:'relative',
                                    width: '400px',
                                    height: '45px',
                                    backgroundColor: 'transparent',
                                    marginLeft: '150px',
                                    top:'10px',
                                    marginTop: '0px',
                                    fontSize:'20px',
                                    borderRadius: '10px',
                                    boxShadow: '2px 2px gray',
                                    }}
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={(event) => this.setState({email: event.target.value})}/>
                            <p 
                                style={{
                                    positive:'relative',
                                    marginLeft: '150px',
                                    marginTop:'10px',
                                    Top: '8px',
                                    fontSize:'24px'
                                    }}>
                                Password
                            </p>
                            <input 
                                style={{
                                    positive:'relative',
                                    width: '400px',
                                    height: '45px',
                                    backgroundColor: 'transparent',
                                    marginLeft: '150px',
                                    Top: '0px',
                                    fontSize:'20px',
                                    borderRadius: '10px',                                    
                                    marginBottom:'10px',
                                    boxShadow: '2px 2px gray',
                                    }}
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(event) => this.setState({password: event.target.value})}/>
                            <br/>
                            <input 
                                style={{
                                    positive:'relative',
                                    width: '200px',
                                    height: '50px',
                                    backgroundColor: 'wheat',
                                    marginLeft: '250px',
                                    marginTop: '20px',
                                    fontSize:'20px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    boxShadow: '2px 2px gray',
                                    }} 
                                type="submit" 
                                value="Submit" 
                                onClick={this.login}/>
                        </form>
                        <Link to="/register">
                            <button
                                style={{
                                    positive:'relative',
                                    width: '200px',
                                    height: '50px',
                                    backgroundColor: 'wheat',
                                    marginLeft: '250px',
                                    marginTop:'10px',
                                    fontSize:'20px',
                                    borderRadius: '20px',
                                    }}>
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}
