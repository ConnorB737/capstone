import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        if (this.props.main.user == null) {
            this.props.redirectToLogin();
        } else {
            this.props.getGames(this.props.main.socket);
        }
        this.state = {
            mode: '',number:''
        };
        // this.handleChange = this.handleChange.bind(this);
    }
    // handleChange(event) {
    //     event.preventDefault();
    //     this.props.handleChange(this.props.main.socket, this.state.mode, this.state.number);
    // }

    joinGame(gameId) {
        this.props.joinGame(this.props.main.socket, gameId);
    }

    render() {
        if (this.props.main.user == null) {
            return null;
        }

        return (

                <div className="bgimg">
                    <div style={{positive:'relative'}}>
                        <center>
                <label><input type="radio" name="mode" value="Normal"
                              onChange={(event) => this.setState({mode: event.target.value})}/>Normal</label>
                <label><input type="radio" name="mode" value="AI"
                              onChange={(event) => this.setState({mode: event.target.value})}/>AI</label>
                <br/>
                      {/*<div>{this.state.mode}</div>*/}

                <label><input type="radio" name="number" value="3"
                              onChange={(event) => this.setState({number: event.target.value})}/>3</label>
                <label><input type="radio" name="number" value="4"
                              onChange={(event) => this.setState({number: event.target.value})}/>4</label>
                <label><input type="radio" name="number" value="5"
                              onChange={(event) => this.setState({number: event.target.value})}/>5</label>
                <label><input type="radio" name="number" value="6"
                              onChange={(event) => this.setState({number: event.target.value})}/>6</label>
                {/*<div> {this.state.number}</div>*/}
                <h1>Welcome, { this.props.main.user.email } !</h1>
                <a onClick={this.props.logout}>Logout</a>
                <h2>Ready games</h2>
                <ul>
                    {
                        this.props.main.readyGames.map((game) => {
                            return <li onClick={this.joinGame.bind(this, game.id)}>Game #{game.id}</li>
                        })
                    }
                </ul>
                <h2>Joined games</h2>
                <ul>
                    {
                        this.props.main.joinedGames.map((game) => {
                            return <li>Game #{game.id}</li>
                        })
                    }
                </ul>
                <h2>Open games</h2>
                <ul>
                    {
                        this.props.main.openGames.map((game) => {
                            return <li>Game #{game.id} - <span onClick={this.joinGame.bind(this, game.id)}>Join</span></li>
                        })
                    }
                </ul></center></div>
                </div>
        );
    }

}
