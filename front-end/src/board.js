import React, { Component } from 'react';
import { Tile } from './tile';
import Popup from "reactjs-popup";


class Board extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            rackList: ['A','B','C','D','E','F'],
            boardState: Array(15).fill(0).map(row => new Array(15).fill(null)),
            swapList: [], // array of index related to the rackList that need to be send to backend and remove from it.
            player: {
                name: "",
                score: 0,
            },
            opponent: {},
        }
    }
    
    renderTile(i) {
        return <Tile value={i}/>
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, coordinate) => {
        let value = ev.dataTransfer.getData("value");
        let tempState = this.state.boardState;
        let i=coordinate[0];
        let j=coordinate[1];
        tempState[i][j] = value;
        this.setState({
            boardState: tempState,
        })
    }

    handleSwapClick = (e, i) => {
        let temp = []
        if (this.state.swapList.length === 0) {
            if (e.target.id==="tile") {
                e.target.id="newTile"
                temp.push(i)
                this.setState({swapList:temp})
            }
        } else {
            if (e.target.id === "newTile") {
                e.target.id="tile"
                temp = []
                this.setState({swapList:temp})
            }
        }
    }

    handleSwapSend = () => {

    }

    SwapPop = () => {
        let rackBar = this.state.rackList.map((cell,i) =>
                <td 
                    key={i}
                    onClick={(e) => this.handleSwapClick(e, i)}
                >
                {this.renderTile(cell)}
                </td>
            )

        return (
            <Popup trigger={<button>Swap</button>} modal>
                {
                    close=> (
                        <div>
                            <div>
                                Choose One tile to swap
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            {rackBar}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="swapPopFunction">
                                <button onClick={() => this.handleSwapSend()}>Swap</button>
                                <button onClick={ () => {
                                    close();
                                }}>Cancel</button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        )
    }

    render() {
        let boardState = this.state.boardState;
        let board = boardState.map((row,i) => 
            <tr key={i}>{row.map((cell,j) => 
                <td 
                    key={i*15+j}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}
                >
                {this.renderTile(cell)}
                </td>)}
            </tr>)
        
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
                        {this.SwapPop()}
                    </div>
                </div>
            </div>
        )
    }
}


export default Board;