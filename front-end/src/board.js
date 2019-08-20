import React, { Component } from 'react';

class Board extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            rackList: ['A','B','C','D','E','F','G','H','I','J','K'],
            boardSate: this.initBoardState(),  // right now just empty nested 15 by 15 lists, could replaced by lists send from backend.
            player: {
                name: "",
                score: 0,
            },
            opponent: [],
            wordsPlayed: ["hello", " world"], // contain history
        }
    }

    // componentWillMount() {
    //     fetch("http:  ").then(Response => Response.json()).then(({results: boardSate}) => this.setState({boardSate}))
    // }


    // create empty 15 by 15 nested lists
    initBoardState = () => {
        let board = []
        for (let i=0; i<15; i++) {
            let row = []
            for (let j=0; j<15; j++) {
                row.push([])
            }
            board.push(row)
        }
        return board;
    }

    render() {
        let boardSate = this.state.boardSate;

        let wordsPlayedList = this.state.wordsPlayed.map((word) => 
            <li key={word.toString()}> {word} </li>
        )

        return (
            <div>
                <div id="board">
                    <table>
                        <tbody>
                            {boardSate.map((row,i) => 
                            <tr key={i}>{row.map((cell,j) => 
                            <td key={i*15+j}>{cell}</td>)}</tr>)}
                        </tbody>
                    </table>
                </div>
                <div id="rightBar">
                    <div id="wordsPlayed">
                        <div id="wordsPlayedNav">
                        <h3>Words Played</h3>
                        </div>
                        <ul>{wordsPlayedList}</ul>
                    </div>
                    <hr/>
                    <div id="scoreBar">
                        <div id="scoreBarNav">
                            <h3>Score:</h3>
                        </div>
                    </div>
                    <hr/>
                    <div id="bag">
                        <div id="bagNav">
                        <h3>Tiles Left:</h3>
                        </div>
                    </div>
                </div>
                <div id="functionBar">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{this.state.rackList[0]}</td>
                                    <td>{this.state.rackList[1]}</td>
                                    <td>{this.state.rackList[2]}</td>
                                    <td>{this.state.rackList[3]}</td>
                                    <td>{this.state.rackList[4]}</td>
                                    <td>{this.state.rackList[5]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button>Play</button>
                        <button>Pass</button>
                        <button>Clear</button>
                        <button>Swap</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Board;