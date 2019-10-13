import React, { Component } from 'react';
import { Tile } from '../tile';
import words from '../../words.json';
import specialTiles from "../../specialTiles.json";
import Popup from "reactjs-popup";
import playTile from "./playTile";
import handleOnDrop from "./drag";
import DIRECTION from "../../types";
import {Link} from "react-router-dom";


const SPECIAL_TILE_PLACEMENT = specialTiles["specialTiles"];


const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    a.sort();
    b.sort();
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};


class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swapList: [], // array of index related to the rackList that need to be send to backend and remove from it
            word: {
                direction: [DIRECTION.NOT_PLACED], 
                placedTiles: [], //contains the coords of each tile
            },
            localRack: [],
            wordList: words["wordList"],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If the rack changes on the server, update our version of the rack
        const oldRack = prevProps.main.rack;
        if (!arraysEqual(oldRack, this.props.main.rack)) {
            this.setState({
                localRack: this.props.main.rack,
            });
        }
    }

    renderTile(cell){
        return <Tile value={cell} />
    }
    
    renderTileIJ(tileIndexY, tileIndexX, cell) {
        let placedTiles = this.state.word.placedTiles;
        for (let tileIndex = 0; tileIndex < placedTiles.length; tileIndex++) {
            const tile = placedTiles[tileIndex];
            if (tileIndexY === tile['y'] && tileIndexX === tile['x']){
                return <Tile value={tile['value']} />
           }
        }
        if (cell != null) {return <Tile value={cell} />}
    }

    onDragOver(ev) {
        ev.preventDefault();
    }

    onDrop(ev, coordinate) {
        ev.preventDefault();
        let value = ev.dataTransfer.getData("value");
        let tempBoardState = JSON.parse(JSON.stringify(this.props.main.serverBoard)); //cloning the object, as opposed to referencing it
        let droppedTileY = coordinate[0];
        let droppedTileX = coordinate[1];

        // this part handles the remove tile from rack once it been placed on the board
        const localRack = this.state.localRack;
        if (this.props.main.roundStatus.currentRound.currentUserHasPlayed != true) {
            if (tempBoardState[droppedTileY][droppedTileX] === null) {
                const rackIndex = localRack.indexOf(value);
                if (rackIndex !== -1) localRack.splice(rackIndex, 1);

                this.setState({localRack:localRack});

                //this part of the code handles the checking of whether you're placing tiles in a logical order
                //it won't let you place tiles randomly,
                //but instead enforces that tiles are inline horizontally or vertically
                //and all touching

                const placedTiles = this.state.word.placedTiles;
                function placeTileOnBoard(placedTile) {
                    placedTiles.push(placedTile);
                    this.props.placeTile(placedTile);
                }
                placeTileOnBoard = placeTileOnBoard.bind(this);

                const word = this.state.word;
                const lasts = handleOnDrop(word, value, droppedTileX, droppedTileY, placeTileOnBoard, tempBoardState, placedTiles);

                this.setState({
                    ...this.state,
                    ...lasts,
                });
            }
        } else (
            alert ("Please wait for next round")
        ) 
    }

    _tile_class_name(i, j) {
        for (let tileClass in SPECIAL_TILE_PLACEMENT) {
            if (SPECIAL_TILE_PLACEMENT.hasOwnProperty(tileClass)) {
                let found = SPECIAL_TILE_PLACEMENT[tileClass].find(location => {
                    if (location[0] === i && location[1] === j) {
                        return true;
                    }
                });
                if (found) {
                    return tileClass;
                }
            }
        }

        return "normaltd";
    }

    handleSwapClick = (event, value) => {
        let temp = this.state.swapList;

        if (event.target.className === "tile") {
            event.target.className = "newTile";
            temp.push(value);
            this.setState({swapList:temp})
        }
        else {
            event.target.className = "tile";
            for(let i = 0; i < temp.length; i++){
                if (temp[i] === value) {
                    temp.splice(i, 1)
                }
             }
             this.setState({swapList:temp})
        }
    };

    handleSwapSend = () => {
        this.props.swapTile(this.props.main.socket, this.state.swapList);
        let temp = [];
        this.setState({swapList:temp});
    };

    SwapPop = () => {

        let rackBar = this.props.main.rack.map((cell,i) =>
                <td
                    key={i}
                    onClick={(e) => this.handleSwapClick(e, cell)}
                >
                {this.renderTile(cell)}
                </td>
            );

        return (
            <Popup trigger={<button>Swap</button>} modal>
                {
                    close=> (
                        <div className="swapPop">
                            <div className="swapPopNav">
                                Choose One tile to swap
                            </div>
                            <div className="selectrack">
                                <table>
                                    <tbody>
                                        <tr>
                                            {rackBar}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="swapPopFunction">
                                <button onClick={() => {
                                    this.handleSwapSend();
                                    close()
                                }}>Swap</button>
                                <button onClick={ () => {
                                    close();
                                }}>Cancel</button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        )
    };

    play() {
        const placedTiles = this.state.word.placedTiles;
        const direction = this.state.word.direction[0];
        const board = this.props.main.serverBoard;
        const wordList = this.state.wordList;
        const placeWord = this.props.placeWord.bind(this);
        const socket = this.props.main.socket;
        const tempRack = this.state.localRack;
        const word = this.state.word;

        playTile(placedTiles, direction, board, wordList, placeWord, socket, tempRack, word);
        
        this.clear();
    }

    clear() {
        this.state.word.direction[0] = DIRECTION.NOT_PLACED;
        this.state.word.placedTiles.length = 0; //delete all tiles
        this.props.main.serverBoard = this.props.getBoard(this.props.main.socket);
        this.setState({localRack:this.props.main.rack});
    }

    handlePass = () => {
        this.props.passRound(this.props.main.socket);
    };

    exitgame = () => {
        return(
            <Popup trigger={<button className="exitButton">Exit Game</button>}>{
                close=> (
                    <div className="passPopup">
                        <div className="passPopButtons">
                            <p style={{ fontSize:'13px',marginLeft:'7px'}}>Are you sure to exit game?</p>
                            <Link to="/dashboard"><button
                                className="passButton"
                            >
                                Yes
                            </button></Link>
                            <button
                                onClick={ () => {close()}}>
                                No
                            </button>
                        </div>
                    </div>
                )
            }
            </Popup>
        )
    };
    pass = () => {
        return (
            <Popup trigger={<button className="passButton">Pass</button>}>
                {
                    close=> (
                        <div className="passPopup">
                            <div className="passPopButtons">
                                <button 
                                    onClick={() => {
                                        this.handlePass();
                                        close()}}
                                    className="passButton"
                                    >
                                    Confirm
                                </button>
                                <button 
                                    onClick={ () => {close()}}>
                                    Cancel
                                </button>
                            </div>

                        </div>
                    )
                }
            </Popup>
        )
    };

    render() {
        if (this.props.main.serverBoard) {
            const boardState = this.props.main.serverBoard.map((row,i) => {
                return (<tr className="normaltr" key={i}>{row.map((cell, j) =>{
                    return(<td className={this._tile_class_name(i, j)}
                                  key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, [i, j])}
                      >{
                          this.renderTileIJ(i,j,cell)
                       }
                      </td>)
                }) }
                </tr>)
            });

            let rackList = [];
            if (this.state.localRack != null) {
                rackList = this.state.localRack.map(tile => {
                    return (<tr><td>{this.renderTile(tile)}</td></tr>)
                })
            }

            let swapPopUp = [];
            if (this.props.main.rack != null) {
                swapPopUp = this.SwapPop();
            }

            return (
                <div className="board">
                    <div className="leftBar">
                        <div className="leftButton">
                            {this.exitgame()}
                            <Link to="/Help"><button className="help">Help</button></Link>
                            {this.pass()}
                        </div>
                        <div className="functionBar">
                            <div className="rackButton">
                                <button id="rackBarPlay" onClick={this.play.bind(this)}>Play</button>
                                <button onClick={this.clear.bind(this)}>Clear</button>
                                { swapPopUp }
                            </div>
                            <div className="rackBar">
                                <table>
                                    <tbody>
                                        {rackList}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="boardMain">
                        <div className="squareDiv">
                            <table>
                                <tbody>
                                    {boardState}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}


export default Board;
