import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './dashboard_style.css';
import logo from '../image/logo.png';

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
    }

    componentDidMount() {

    }

    componentDidUpdate(oldProps, oldState, snapshot) {
        if (oldProps.main.readyGame == null && this.props.main.readyGame != null) {
            this.joinGame(this.props.main.readyGame.id);
        }
    }

    joinGame(gameId) {
        this.props.joinGame(this.props.main.socket, gameId);
    }
    
    renderGames(props){
        if (this.props.main.readyGames.length > 0) {
            this.props.main.readyGames.map((game) => {
                return <li onClick={this.joinGame.bind(this, game.id)}>Game #{game.id}</li>
            })
        } else {
            return <p> There appears to be no games! Make your own down below </p>
        }
    }

    render() {
        return (
            <div className="bgimg">
                <div className="dashboard_container">
                    <div style={{positive:'relative'}}>
                        <img className="DB_logo" src={logo}/>
                        <div className="dashboard_head">
                            <h1 className="DB_h1">Join an existing game</h1>
                            <div className="login_area">
                                <label className="DB_l">Welcome!</label>
                                <a className="DB_a" onClick={this.props.logout}>Logout</a>
                            </div>
                        </div>

                        <div className="DB_content">
                            <ul>
                                {
                                    this.props.main.openGames.map((game) => {
                                        return <li onClick={this.joinGame.bind(this, game.id)}>Game #{game.id}</li>
                                    })
                                }
                            </ul>
                            <br/><br/>
                        </div>
                            
                        <div className="dashboard_head">
                            <h1 className="DB_h1"> Make your own game </h1>
                        </div>
                        
                        <div className="DB_content">
                            <label>Human Players (between 3 and 6) </label> <input type="number" min="3" max="6" onChange={(event) => this.setState({number: event.target.value})} />
                            <br/>
                            <label>Have an AI player? </label> <input type="checkbox" name="mode" value="AI" onChange={(event) => this.setState({mode: event.target.value})} />
                            <br/> <br/>
                            <input id="start" type="button" value="Start Game"/>
                        </div>
                    
                    </div>
                </div>
            </div>
        );
    }

}
