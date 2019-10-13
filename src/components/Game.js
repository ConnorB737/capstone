import React, { Component } from 'react';
import BoardContainer from '../containers/BoardContainer';
import Popup from "reactjs-popup";

export class Game extends Component {

    componentDidMount() {
        this.props.getEverything(this.props.main.socket);

        this.interval = setInterval(() => {
            this.props.getEverything(this.props.main.socket);
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
		const sBoard = this.props.main.serverBoard; //this.props.serverBoard is the board received from the server
        
        // let wordsPlayedList = this.props.main.history.map((word) => //no longer use a history list
            // <li key={word.toString()}> {word} </li>
        // );
        
        // console.log(this.props);
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
        
        let gameIdentification;
        if(this.props.main.readyGame){
            gameIdentification = "#" + this.props.main.readyGame.id;
        } else {
            gameIdentification = "Loading...";
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <BoardContainer serverBoard={sBoard} />
                </div>
                <div className="rightBar">
                    <h2 style={{margin:0}}>Game {gameIdentification}</h2>
                    <div id="roundStatus">
                        {this.props.main.user.login}
                        {roundStatus}
                    </div>
                    <hr style={{margin:0}}/>
                    <div className="score">
                        <table style={{border:0}}>
                        {
                            Object.keys(this.props.main.scores).sort().map(score => {
                                if (score.endsWith("_acted"))
                                    return "";
                                else if(this.props.main.scores[score + "_acted"])
                                    return (<tr> <td style={{color:"darkgreen"}} key={score}>{score}</td> <td>{this.props.main.scores[score]}</td></tr>);
                                else 
                                    return (<tr> <td style={{color:"darkred"}} key={score}>{score}</td> <td>{this.props.main.scores[score]}</td></tr>);
                            })
                        }
                        </table>
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