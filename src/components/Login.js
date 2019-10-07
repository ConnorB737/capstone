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
                <div style={{positive:'relative'}}>

                    <img src={logo} style={{ positive:'relative',marginLeft: '555px'}}/>
                <div style={{
                    width: '700px',
                    height: '370px',
                    backgroundColor: 'white',
                    margin: '0 auto',
                    borderRadius: '10%'
                }}><h1 style={{ positive:'relative',marginTop:'20px',marginLeft: '280px'}} >Login</h1>
                <form action="#" method="post">
                    <p style={{
                        positive:'relative',
                        marginLeft: '90px',
                        marginTop: '0px',
                        fontSize:'24px'
                    }} >Email</p>
                    <input style={{
                        positive:'relative',
                        width: '540px',
                        height: '45px',
                        backgroundColor: '#FFFF99',
                        marginLeft: '90px',
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
                        marginLeft: '90px',
                        marginTop:'10px',
                        Top: '8px',
                        fontSize:'24px'
                    }}>Password</p>
                    <input
                        style={{
                            positive:'relative',
                            width: '540px',
                            height: '45px',
                            backgroundColor: '#FFFF99',
                            marginLeft: '90px',
                            Top: '0px',
                            fontSize:'20px',
                            borderRadius: '3%',
                            marginBottom:'10px'
                        }}
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                    />

                    <input style={{
                        positive:'relative',
                        width: '400px',
                        height: '50px',
                        backgroundColor: 'wheat',
                        marginLeft: '148px',
                        Top: '30px',
                        // marginTop:'30x',
                        fontSize:'20px'
                    }} type="submit" value="Submit" onClick={this.login}/>

                </form>
                <Link to="/register"><button
                    style={{
                        positive:'relative',
                        width: '400px',
                        height: '50px',
                        backgroundColor: 'wheat',
                        marginLeft: '148px',
                        marginTop:'10px',
                        fontSize:'20px'
                    }} >Register</button></Link></div>
            </div>
            </div>
        );
    }

}
