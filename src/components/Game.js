import React, { Component } from 'react';
import BoardContainer from '../containers/BoardContainer';
import Popup from "reactjs-popup";

export class Game extends Component {

    componentDidMount() {
        this.props.getGames(this.props.main.socket);
        this.props.getBoard(this.props.main.socket);
        this.props.getScores(this.props.main.socket);
        this.props.getRack(this.props.main.socket);
        this.props.getTilesLeft(this.props.main.socket);
        this.props.getHistory(this.props.main.socket);
        this.props.getRoundStatus(this.props.main.socket);
        this.props.getPlayersLeft(this.props.main.socket);
    }

    render() {
		const sBoard = this.props.main.serverBoard; //this.props.serverBoard is the board received from the server
        
        let wordsPlayedList = this.props.main.history.map((word) => 
            <li key={word.toString()}> {word} </li>
        );
        
        console.log(this.props);
        let roundStatus;
        if (this.props.main.roundStatus) {
            roundStatus = <h3>Round: {this.props.main.roundStatus.roundNumber}</h3>
        } else {
            if(this.props.main.playersLeft){
                roundStatus = <h3>Waiting for {this.props.main.playersLeft.playersLeft} players</h3>
            } else {
                roundStatus = <h3>Waiting...</h3>
            }
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <BoardContainer serverBoard={sBoard} />
                </div>
                <div className="rightBar">
                    <div className="wordsPlayed">
                        <div className="wordsPlayedNav">
                            <h3>Words Played</h3>
                        </div>
                        <ul>{wordsPlayedList}</ul>
                    </div>
                    <hr/>
                    <div id="roundStatus">
                        {this.props.main.user.login}
                        {roundStatus}
                    </div>
                    <hr/>
                    <div className="score">
                        {
                            Object.keys(this.props.main.scores).map(score => {
                                return (<p key={score}>{score}: {this.props.main.scores[score]}</p>);
                            })
                        }
                    </div>
                    <hr/>
                    <div className="bag">
                        <div className="bagNav">
                            <p>Tiles Left: {this.props.main.tiles_left}</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Game