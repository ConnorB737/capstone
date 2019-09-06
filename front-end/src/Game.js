import React, { Component } from 'react';
import Board from './board';

export class Game extends Component {

    componentDidMount() {
        this.props.getGames(this.props.socket);
        this.props.getBoard(this.props.socket);
    }

    render() {
        const gamesList = this.props.games.map(game => {
            return (<li>{game.id} </li>);
        });
        
		const sBoard = this.props.serverBoard; //this.props.serverBoard is the board received from the server
        
        const wordsPlayed = ["hello", " world"] // contain history
        let wordsPlayedList = wordsPlayed.map((word) => 
        <li key={word.toString()}> {word} </li>)


        return (
            <div className="game">
                <div id="leftBar">
                    <div id="gamesList">
                        <h3 id="gameListNav">Games</h3>
                        <ul>
                            { gamesList }
                        </ul>
                    </div>
                    <hr/>
                    <div id="scoreBar">
                        <div id="scoreBarNav">
                            <h3>Score:</h3>
                        </div>
                    </div>
                </div>

                <div className="game-board">
                    <Board serverBoard={sBoard} />
                </div>


                <div id="rightBar">
                    <div id="wordsPlayed">
                        <div id="wordsPlayedNav">
                        <h3>Words Played</h3>
                        </div>
                        <ul>{wordsPlayedList}</ul>
                    </div>

                    <hr/>
                    <div id="bag">
                        <div id="bagNav">
                        <h3>Tiles Left:</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game