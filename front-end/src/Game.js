import React, { Component } from 'react';
import Board from './board';
// import Square from "./square";



export class Game extends Component {

    componentDidMount() {
        this.props.getGames(this.props.socket);
    }

    render() {
        const gamesList = this.props.games.map(game => {
            return (<li>{game.id} </li>);
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                {/* <div id="gamesList">
                    <h3>Games</h3>
                    <ul>
                        { gamesList }
                    </ul>
                </div> */}
            </div>
        );
    }
}

export default Game