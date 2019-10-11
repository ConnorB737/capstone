import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from '../image/logo.png';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.register = this.register.bind(this);
    }

    register(event) {
        event.preventDefault();
        this.props.register(this.props.main.socket, this.state.email, this.state.password);
    }

    render() {
        return (
            <div>
                <div style={{positive:'relative'}}>
                    <img src={logo} style={{width:'520px',height:'170px'}}/>
                    <div className="FormContainer">
                        <h1 
                            style={{ 
                                marginTop:'1vw',
                                marginLeft: '16vw'}} >
                            Register
                        </h1>
                        <form action="#" method="post">
                            <p 
                                style={{
                                    marginLeft: '5vw',
                                    marginTop: '0vw',
                                    fontSize:'1.5vw',
                                    }}>
                                Email</p>
                            <input
                                style={{
                                    width: '30vw',
                                    height: '2vw',
                                    marginLeft: '5vw',
                                    marginTop: '0vw',
                                    fontSize:'1.5vw',
                                    borderRadius: '10px',
                                    boxShadow: '2px 2px gray',
                                    }}
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={(event) => this.setState({email: event.target.value})}/>
                            <p 
                                style={{
                                    marginLeft: '5vw',
                                    marginTop: '1vw',
                                    fontSize:'1.5vw',
                                    }}>
                                Password</p>
                            <input
                                style={{
                                    width: '30vw',
                                    height: '2vw',
                                    marginLeft: '5vw',
                                    marginTop: '0vw',
                                    fontSize:'1.5vw',
                                    borderRadius: '10px',
                                    boxShadow: '2px 2px gray',
                                    }}
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(event) => this.setState({password: event.target.value})}/>
                            <br/>
                            <input 
                                style={{
                                    width: '8vw',
                                    height: '3vw',
                                    backgroundColor: 'wheat',
                                    marginLeft: '15.5vw',
                                    marginTop: '1vw',
                                    fontSize:'1.5vw',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    boxShadow: '2px 2px gray',
                                    }} 
                                type="submit" 
                                value="Register" 
                                onClick={this.register}/>
                        </form>
                        <Link to="/login">
                            <button 
                                style={{
                                    width: '8vw',
                                    height: '3vw',
                                    backgroundColor: 'wheat',
                                    marginLeft: '15.5vw',
                                    marginTop: '1vw',
                                    fontSize:'1.5vw',
                                    borderRadius: '20px',
                                    boxShadow: '2px 2px gray',
                                    }}>
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}
