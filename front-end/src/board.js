import React, { Component } from 'react';
import { Tile } from './tile';

class Board extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            rackList: ['A','B','C','D','E','F','G','H','I','J','K'],
            boardSate: Array(15).fill(0).map(row => new Array(15).fill(null)),
            player: {
                name: "",
                score: 0,
            },
            opponent: {},
        }
    }
    
    renderTile(i) {
        return <Tile value={i} />
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, coordinate) => {
        let value = ev.dataTransfer.getData("value");
        let temState = this.state.boardSate;
        let i=coordinate[0];
        let j=coordinate[1];
        temState[i][j] = value;
        this.setState({
            boardSate: temState,
        })
    }

    findWord = () => {
        
    }





    render() {
        let boardSate = this.state.boardSate;
        let board = boardSate.map((row,i) => 
            <tr key={i}>{row.map((cell,j) => 
                <td 
                    key={i*15+j}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {(e) => this.onDrop(e, [i,j])}
                >
                {this.renderTile(cell)}
                </td>)}
            </tr>)
        
        
        let rackList = this.state.rackList;

        return (
            <div>
                <div id="board" >
                    <table>
                        <tbody>
                            {board}
                        </tbody>
                    </table>
                </div>
    
                <div id="functionBar">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{this.renderTile(rackList[0])}</td>
                                    <td>{this.renderTile(rackList[1])}</td>
                                    <td>{this.renderTile(rackList[2])}</td>
                                    <td>{this.renderTile(rackList[3])}</td>
                                    <td>{this.renderTile(rackList[4])}</td>
                                    <td>{this.renderTile(rackList[5])}</td>
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