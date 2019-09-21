import React, { Component } from 'react';
import logo from '../src/image/logo.png';
import BoardContainer from './BoardContainer';

export class Game extends Component {

    componentDidMount() {
        this.props.getGames(this.props.socket);
        this.props.getBoard(this.props.socket);
        this.props.getScores(this.props.socket);
    }

    render() {
		const sBoard = this.props.serverBoard; //this.props.serverBoard is the board received from the server
        
        const wordsPlayed = ["hello", " world"] // contain history
        let wordsPlayedList = wordsPlayed.map((word) => 
        <li key={word.toString()}> {word} </li>)


        return (
            <div className="game">
                <div className="logo"><img src={logo} alt="" /></div>
               
                <div className="game-board">
                    <BoardContainer serverBoard={sBoard} />
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
                        {
                            Object.keys(this.props.scores).map(score => {
                                return (<p key={score}>{score}: {this.props.scores[score]}</p>);
                            })
                        }
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