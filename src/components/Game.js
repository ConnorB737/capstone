import React, { Component } from 'react';
import logo from '../image/logo.png';
import BoardContainer from '../containers/BoardContainer';
import {Link} from "react-router-dom";

export class Game extends Component {

    componentDidMount() {
        this.props.getGames(this.props.main.socket);
        this.props.getBoard(this.props.main.socket);
        this.props.getScores(this.props.main.socket);
        this.props.getRack(this.props.main.socket);
        this.props.getTilesLeft(this.props.main.socket);
        this.props.getHistory(this.props.main.socket);
    }

    render() {
		const sBoard = this.props.main.serverBoard; //this.props.serverBoard is the board received from the server
        
        let wordsPlayedList = this.props.main.history.map((word) => 
        <li key={word.toString()}> {word} </li>)


        return (
            <div className="bgimg">
            <div className="game">


                <div className="logo"><img src={logo} alt="" /></div>
               
                <div className="game-board">
                    <BoardContainer serverBoard={sBoard} />
                </div>
                <div id="leftButton">
                    <Link to="/"><button className="main">Main Menu</button></Link>
                    <button className="stop">Stop Game</button>
                    <Link to="/Help"><button className="help">Help</button></Link>

                </div>

                <div id="rightBar">
                    <div id="wordsPlayed">
                        <div id="wordsPlayedNav">
                            <h3>Words Played</h3>
                        </div>
                        <ul>{wordsPlayedList}</ul>
                    </div>
                    <hr/>
                    <div id="score">
                        {
                            Object.keys(this.props.main.scores).map(score => {
                                return (<p key={score}>{score}: {this.props.main.scores[score]}</p>);
                            })
                        }
                    </div>

                    <div id="bag">
                        <div id="bagNav"><hr/>
                            <p>Tiles Left: {this.props.main.tiles_left}</p>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        );
    }
}

export default Game