import React, { Component } from 'react';
import { Tile } from '../tile';
import words from '../../words.json';
import specialTiles from "../../specialTiles.json";
import Popup from "reactjs-popup";
import playTile from "./playTile";
import handleOnDrop from "./drag";
import DIRECTION from "../../types";

const SPECIAL_TILE_PLACEMENT = specialTiles["specialTiles"];

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swapList: [], // array of index related to the rackList that need to be send to backend and remove from it
            word: {
                direction: [DIRECTION.NOT_PLACED], 
                placedTiles: [], //contains the coords of each tile
            },
            temp_rack: [],
            wordList: words["wordList"],
        }
    }
    
    renderTile(cell){
        return <Tile value={cell} />
    }
    
    renderTileIJ(tileIndexY, tileIndexX, cell) {
        let placedTiles = this.state.word.placedTiles;
        placedTiles.forEach(tile => {
            if (tileIndexY === tile['y'] && tileIndexX === tile['x']){
                return <Tile value={tile['value']} />
           }
        });
        return <Tile value={cell} />
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
        let temp_rack = this.state.temp_rack;
        if (tempBoardState[droppedTileY][droppedTileX] === null) {
            for (let i = 0; i < this.props.main.rack.length; i++) {
                if (this.props.main.rack[i] === value) {
                    temp_rack.push(this.props.main.rack.splice(i, 1)[0]);
                    break;
                }
            }
            this.setState({temp_rack:temp_rack});
        } 


		//this part of the code handles the checking of whether you're placing tiles in a logical order
		//it won't let you place tiles randomly,
		//but instead enforces that tiles are inline horizontally or vertically
		//and all touching

        var placedTiles = this.state.word.placedTiles;
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
	    console.log(this.state);

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

        if (event.target.id === "tile") {
            event.target.id = "newTile";
            temp.push(value);
            this.setState({swapList:temp})
        }
        else {
            event.target.id = "tile";
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
                        <div>
                            <div>
                                Choose One tile to swap
                            </div>
                            <div id="selectrack">
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
        const tempRack = this.state.temp_rack;
        const word = this.state.word;

        playTile(placedTiles, direction, board, wordList, placeWord, socket, tempRack, word);
        
        this.clear();
    }

    clear() {
        this.state.word.direction[0] = DIRECTION.NOT_PLACED;
        this.state.word.placedTiles.length = 0; //delete all tiles
        this.props.main.serverBoard = this.props.getBoard(this.props.main.socket);
        for (let i=0; i<this.state.temp_rack.length; i++) {
            this.props.main.rack.push(this.state.temp_rack[i])
        };
        this.setState({temp_rack:[]});
    }

    pass() {

    }


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
            if (this.props.main.rack != null) {
                rackList = this.props.main.rack.map(tile => {
                    return <td>{this.renderTile(tile)}</td>
                })
            }

            let swapPopUp = [];
            if (this.props.main.rack != null) {
                swapPopUp = this.SwapPop();
            }

            return (
                <div id="board">

                        <table >
                            <tbody>
                                {boardState}
                            </tbody>
                        </table>


                    <div id="functionBar">
                        <div>
                            <table>
                                <tbody>
                                    <tr>{rackList}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button onClick={this.play.bind(this)}>Play</button>
                            <button onClick={this.pass.bind(this)}>Pass</button>
                            <button onClick={this.clear.bind(this)}>Clear</button>
                            { swapPopUp }
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
