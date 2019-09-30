import React, { Component } from 'react';
import {Link} from "react-router-dom";

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
            <center>
	        <img src="../src/image/logo.png"/>
                <h1>Login</h1>
                <form action="#" method="post">
                    <p>Email</p>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                    />
                    <br/>
                    <br/>
                    <input type="submit" value="Submit" onClick={this.login}/>

                </form>
                <Link to="/register"><button>Register</button></Link>
            </center>
        );
    }

}
