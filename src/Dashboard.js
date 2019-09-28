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
    }

    render() {
        if (this.props.main.user == null) {
            return null;
        }

        return (
            <center>
                <h1>Welcome, { this.props.main.user.email } !</h1>
                <a onClick={this.props.logout}>Logout</a>
                <h2>Joined games</h2>
                <ul>
                    {
                        this.props.main.joinedGames.map((game) => {
                            return <li><Link to={ `/game/${game.id}` }>Game #{game.id}</Link></li>
                        })
                    }
                </ul>
                <h2>Open games</h2>
                <ul>
                    {
                        this.props.main.openGames.map((game) => {
                            return <li><Link to="/game/{ game.id }">Game #{game.id}</Link></li>
                        })
                    }
                </ul>
            </center>
        );
    }

}
