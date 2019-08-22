import React, { Component } from 'react';
import { Tile } from './tile';

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
        }
    }
    
    renderTile(i) {
        return <Tile value={i} />
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
    
                <div id="functionBar">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{this.renderTile(this.state.rackList[0])}</td>
                                    <td>{this.renderTile(this.state.rackList[1])}</td>
                                    <td>{this.renderTile(this.state.rackList[2])}</td>
                                    <td>{this.renderTile(this.state.rackList[3])}</td>
                                    <td>{this.renderTile(this.state.rackList[4])}</td>
                                    <td>{this.renderTile(this.state.rackList[5])}</td>
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