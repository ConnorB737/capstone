import React, { Component } from 'react';
import Board from './board';
import Square from "./square";
import {A} from "./tile/A";
import {B} from "./tile/B";
import {C} from "./tile/C";
import {D} from "./tile/D";
import {E} from "./tile/E";
import {F} from "./tile/F";


export class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>
                        {}
                    </div>
                    <ol>
                        {}
                    </ol>
                </div>
                <div id="tiles">
                    <p id='name'>tile menu</p>

                    <div draggable="true">
                        <A/>
                    </div>

                    <div draggable="true" >
                        <B/>
                    </div>

                    <div draggable="true" >
                        <C/>
                    </div>

                    <div  draggable="true">
                        <D/>
                    </div>

                    <div  draggable="true">
                        <E/>
                    </div>

                    <div  draggable="true">
                        <F/>
                    </div>

                    <div className="controls">
                        <button className="button" >Shuffle</button>
                        {/*onClick={this.handleRandom}*/}
                    </div>

                </div>
            </div>
        )
    }
}

export default Game