import React, { Component } from 'react';
import Board from './board';
import logo from '../src/image/logo.png';

export class Game extends Component {

    componentDidMount() {
        this.props.getGames(this.props.socket);
    }

    render() {
        const gamesList = this.props.games.map(game => {
            return (<li>{game.id} </li>);
        });

        const wordsPlayed = ["hello", " world"] // contain history
        let wordsPlayedList = wordsPlayed.map((word) => 
        <li key={word.toString()}> {word} </li>)


        return (
            <div className="game">
                <div className="logo"><img src={logo} alt="" /></div>
                <div className="game-board">
                    <Board/>
                </div>
                <div id="leftButton">
                    <button className="main">Main Menu</button>
                    <button className="stop">Stop Game</button>
                    <button className="help" onClick={()=>{
                        window.location. assign("../public/help.html")}}>Help</button>

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
                        <p>Your last score:</p><hr/>
                        <p>Your total score:</p>
                    </div>

                    <div id="bag">
                        <div id="bagNav"><hr/>
                            <p>Tiles Left:</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Game