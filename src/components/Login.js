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
                <div style={{positive:'relative'}}>
                <img src={logo} style={{ positive:'relative',marginLeft: '555px'}}/>
                <h1 style={{ positive:'relative',marginLeft: '680px'}} >Login</h1>
                <form action="#" method="post">
                    <p style={{
                        positive:'relative',
                        marginLeft: '570px',
                        marginTop: '0px',
                        fontSize:'24px'
                    }} >Email</p>
                    <input style={{
                        positive:'relative',
                        width: '340px',
                        height: '45px',
                        backgroundColor: 'burlywood',
                        marginLeft: '570px',
                        top:'10px',
                        marginTop: '0px',
                        fontSize:'20px',
                        borderRadius: '3%'
                    }}
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}
                    />
                    <p style={{
                        positive:'relative',
                        marginLeft: '570px',
                        Top: '3px',
                        fontSize:'24px'
                    }}>Password</p>
                    <input
                        style={{
                            positive:'relative',
                            width: '340px',
                            height: '45px',
                            backgroundColor: 'burlywood',
                            marginLeft: '570px',
                            Top: '0px',
                            fontSize:'20px',
                            borderRadius: '3%'
                        }}
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                    />
                    <br/>
                    <br/>
                    <input style={{
                        positive:'relative',
                        width: '100px',
                        height: '40px',
                        backgroundColor: 'wheat',
                        marginLeft: '690px',
                        Top: '10px',
                        fontSize:'17px',
                        borderRadius: '10%'
                    }} type="submit" value="Submit" onClick={this.login}/>

                </form>
                <Link to="/register"><button
                    style={{
                        positive:'relative',
                        width: '100px',
                        height: '40px',
                        backgroundColor: 'wheat',
                        marginLeft: '690px',
                        marginTop:'6px',
                        // Top: '10px',
                        fontSize:'17px',
                        borderRadius: '10%'
                    }} >Register</button></Link>
            </div>
        );
    }

}
