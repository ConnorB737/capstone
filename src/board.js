import React, { Component } from 'react';
import { Tile } from './tile';
import words from './words.json';
import Popup from "reactjs-popup";

const SPECIAL_TILE_PLACEMENT = {
    "TW2": [
        [7, 0],
        [7, 14],
        [0, 0],
        [0, 7],
        [0, 14],
        [14, 0],
        [14, 7],
        [14, 14],
    ],
    "TL2": [
        [7, 3],
        [7, 11],
        [5, 1],
        [5, 3],
        [5, 12],
        [5, 14],
        [9, 1],
        [9, 3],
        [9, 12],
        [9, 14],
        [3, 7],
        [11, 7],
        [1, 5],
        [1, 9],
        [13, 5],
        [13, 9],
        [0, 3],
        [0, 4],
        [0, 10],
        [0, 11],
        [14, 3],
        [14, 4],
        [14, 10],
        [14, 11],
    ],
    "ST2": [
        [7, 7],
    ],
    "DL2": [
        [6, 2],
        [6, 4],
        [6, 6],
        [6, 8],
        [6, 10],
        [6, 12],
        [8, 2],
        [8, 4],
        [8, 6],
        [8, 8],
        [8, 10],
        [8, 12],
        [4, 0],
        [4, 6],
        [4, 8],
        [4, 14],
        [10, 0],
        [10, 6],
        [10, 8],
        [10, 14],
        [3, 0],
        [3, 14],
        [11, 0],
        [11, 14],
        [2, 1],
        [2, 6],
        [2, 8],
        [2, 13],
        [12, 1],
        [12, 6],
        [12, 8],
        [12, 13],
        [1, 2],
        [1, 12],
        [13, 2],
        [13, 12],
    ],
    "DW2": [
        [5, 5],
        [5, 9],
        [9, 5],
        [9, 9],
        [4, 4],
        [4, 10],
        [10, 4],
        [10, 10],
        [3, 3],
        [3, 11],
        [11, 3],
        [11, 11],
        [2, 2],
        [2, 12],
        [12, 2],
        [12, 12],
        [1, 1],
        [1, 13],
        [13, 1],
        [13, 13],
    ],
};

const DIRECTION = {
    NOT_PLACED: -1,
    RIGHT: 0,
    DOWN: 1,
};

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rackList: ['A','B','C','D','E','F','G','H','I','J','K'],
            swapList: [], // array of index related to the rackList that need to be send to backend and remove from it.
            player: {
                name: "",
                score: 0,
            },
            opponent: {},
            
            word: {
                direction: DIRECTION.NOT_PLACED, //direction is -1 before a tile has been placed, 0 if the word is going right, 1 if the word is going down
                placedTiles: [], //contains the coords of each tile
            },
            
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
        
        let tempBoardState = JSON.parse(JSON.stringify(this.props.serverBoard)); //cloning the object, as opposed to referencing it
        
        let droppedTileY = coordinate[0];
        let droppedTileX = coordinate[1];
        
		
		//this part of the code handles the checking of whether you're placing tiles in a logical order
		//it won't let you place tiles randomly, 
		//but instead enforces that tiles are inline horizontally or vertically
		//and all touching
        
        var placedTiles = this.state.word.placedTiles;
        
        //put the word coords into the temporary board state for comparisons with the game logic
        placedTiles.forEach(tile => {
            tempBoardState[tile['y']][tile['x']] = tile['value']
        });

        function placeTileOnBoard(placedTile) {
            placedTiles.push(placedTile);
            this.props.placeTile(placedTile);
        }
        placeTileOnBoard = placeTileOnBoard.bind(this);

        function isValidPlacement(direction){
            //checks whether there is a straight line of tiles from the first tile you've placed,
            //to the last tile you've placed
            //i.e. no gaps
            
            //assumes the first tile has been placed
            let firstTile = placedTiles[0];
            //check that it isn't in the tempCoords
            placedTiles.forEach(tile => {
                if (droppedTileY === tile['y'] && droppedTileX === tile['x']) {
                    return false;
                }
            });
            if(direction === DIRECTION.DOWN){ //vertically
                let firstTileOffset = firstTile['y'] - droppedTileY;
                if (firstTileOffset > 0) { //tile is above first tile
                    //diff -= 1; //because the temState of the tile placed should be null
                    for (let previousTileY = 1; previousTileY < firstTileOffset; previousTileY++){
                        if(tempBoardState[firstTile['y'] - previousTileY][droppedTileX] == null){
                            return false; //is not placable
                        }
                        
                        let isTileInCoords = false; //adds all tiles between clicks to the word
                        for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                            if (firstTile['y'] - previousTileIndex === placedTiles[previousTileIndex]['y'] && droppedTileX === placedTiles[previousTileIndex]['x']){
                                isTileInCoords = true;
                            }
                        }
                        if(!isTileInCoords){
                            placeTileOnBoard({
                                y: firstTile['y'] - previousTileY,
                                x: droppedTileX,
                                value: tempBoardState[firstTile['y'] - previousTileY][droppedTileX],
                            });
                        }
                    }
                } else if (firstTileOffset < 0) { //tile is below first tile
                    //diff += 1;
                    for (let previousTileY = 1; previousTileY < -firstTileOffset; previousTileY++){
                        if(tempBoardState[firstTile['y'] + previousTileY][droppedTileX] == null){
                            return false; //is not placable
                        }
                        
                        let isTileInCoords = false; //adds all tiles between clicks to the word
                        for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                            if(firstTile['y'] + previousTileIndex === placedTiles[previousTileIndex]['y'] && droppedTileX === placedTiles[previousTileIndex]['x']){
                                isTileInCoords = true;
                            }
                        }
                        if(!isTileInCoords){
                            placeTileOnBoard({
                                y: firstTile['y'] + previousTileY,
                                x: droppedTileX,
                                value: tempBoardState[firstTile['y'] + previousTileY][droppedTileX]
                            });
                        }
                    }
                }
            } else if (direction === DIRECTION.RIGHT) { //horizonally
                let firstTileOffset = firstTile['x'] - droppedTileX;
                if(firstTileOffset > 0) { //tile is behind first tile
                    //diff -= 1;
                    for (let previousTileX = 1; previousTileX < firstTileOffset; previousTileX++){
                        if(tempBoardState[droppedTileY][firstTile['x'] - previousTileX] == null){
                            return false; //is not placable
                        }

                        let isTileInCoords = false; //adds all tiles between clicks to the word
                        for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                            if(droppedTileY === placedTiles[previousTileIndex]['y'] && firstTile['x'] - previousTileIndex === placedTiles[previousTileIndex]['x']){
                                isTileInCoords = true;
                            }
                        }
                        if(!isTileInCoords){
                            placeTileOnBoard({
                                y: droppedTileY,
                                x: firstTile['x'] - previousTileX,
                                value: tempBoardState[droppedTileY][firstTile['x'] - previousTileX]
                            });
                        }
                    }
                } else if (firstTileOffset < 0) { //tile is in front of first tile
                    //diff += 1;
                    for (let previousTileX = 1; previousTileX < -firstTileOffset; previousTileX++){
                        if(tempBoardState[droppedTileY][firstTile['x'] + previousTileX] == null){
                            return false; //is not placable
                        }

                        let isTileInCoords = false; //adds all tiles between clicks to the word
                        for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                            if(droppedTileY === placedTiles[previousTileIndex]['y'] && firstTile['x'] + previousTileIndex === placedTiles[previousTileIndex]['x']){
                                isTileInCoords = true;
                            }
                        }
                        if(!isTileInCoords){
                            placeTileOnBoard({
                                y: droppedTileY,
                                x: firstTile['x'] + previousTileX,
                                value: tempBoardState[droppedTileY][firstTile['x'] + previousTileX]
                            });
                        }
                    }
                }
            }
            return true;
        }
        
		if(placedTiles.length === 0){ //checks whether first tile placed, and whether the spot is free
            if(tempBoardState[droppedTileY][droppedTileX] == null){
                placeTileOnBoard({
                    x: droppedTileX,
                    y: droppedTileY,
                    value: value
                });
                tempBoardState[droppedTileY][droppedTileX] = value;
            }
		 } else if (this.state.word.direction === DIRECTION.NOT_PLACED){ //if a direction hasn't been set (usually second move)
			if(droppedTileX === placedTiles[0]['x'] && isValidPlacement(DIRECTION.DOWN)){ //coords[0][1] is the first tile placed 'j' coordinate
                if(tempBoardState[droppedTileY][droppedTileX] == null){
                    this.setState({
                        word: {
                            ...this.state.word,
                            direction: DIRECTION.DOWN, //the word is going vertically
                    }});
                    placeTileOnBoard({
                        x: droppedTileX,
                        y: droppedTileY,
                        value: value
                    });
                    tempBoardState[droppedTileY][droppedTileX] = value;
                }
			} else if (droppedTileY === placedTiles[0]['y'] && isValidPlacement(DIRECTION.RIGHT)){ //coords[0][0] is the first placed 'i' coordinate
                if(tempBoardState[droppedTileY][droppedTileX] == null){
                    this.setState({
                        word: {
                            ...this.state.word,
                            direction: DIRECTION.RIGHT, //the word is going horizontally
                    }});
                    placeTileOnBoard({
                        x: droppedTileX,
                        y: droppedTileY,
                        value: value
                    });
                    tempBoardState[droppedTileY][droppedTileX] = value;
                }
			}
		} else if (this.state.word.direction === DIRECTION.DOWN) { //if going vertically
			if (droppedTileX === placedTiles[0]['x'] && isValidPlacement(DIRECTION.DOWN)){ //and make sure that there is a tiles between either side of the placement
                placeTileOnBoard({
                    x: droppedTileX,
                    y: droppedTileY,
                    value: value
                });
				tempBoardState[droppedTileY][droppedTileX] = value;
			}
		} else if (this.state.word.direction === DIRECTION.RIGHT) { //same deal but horizontally
			if (droppedTileY === placedTiles[0]['y'] && isValidPlacement(DIRECTION.RIGHT)){
                placeTileOnBoard({
                    x: droppedTileX,
                    y: droppedTileY,
                    value: value
                });
				tempBoardState[droppedTileY][droppedTileX] = value;
			}
		}
		
		this.setState({
            ...this.state,
			lastx: droppedTileX,
			lasty: droppedTileY,
		});

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

    play() {

        var placedTiles = this.state.word.placedTiles;
        var direction = this.state.word.direction;

        //sorts the coords in order of their i or j coordinate depending on the direction
         if (direction === DIRECTION.RIGHT) { //horizonal
            placedTiles = placedTiles.sort((a, b) => a['x'] - b['x']);
         } else if (direction === DIRECTION.DOWN) {//vertical
            placedTiles = placedTiles.sort((a, b) => a['y'] - b['y']);
        }

        //as the word is now in order, we can simply take each letter to construct our word
        const combinedWord = placedTiles.map(tile => tile['value']).join("");
        if (this.state.wordList.includes(combinedWord)) { //if valid word, place it on the server and reset the state to place your next word
            this.props.placeWord(this.props.socket, combinedWord, this.state.word.direction, this.state.word.placedTiles);
            this.clear();
        } else { 
            alert("Invalid word!");
        }
    }

    clear() {
        this.setState({
            word: {
                direction: DIRECTION.NOT_PLACED, //direction is -1 before a tile has been placed, 0 if the word is going right, 1 if the word is going down
                placedTiles: [], //contains the coords of each tile
            },
        });
    }

    pass() {

    }


    render() {
        if (this.props.serverBoard) {
            const boardState = this.props.serverBoard.map((row,i) => {
                if (i===7) {
                          return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                              if(j===0||j===14){
                              return(<td  className="TW2"
                                   key={i * 15 + j}
                                   onDragOver={(e) => this.onDragOver(e)}
                                    onDrop = {cell === null?
                                        (e) => this.onDrop(e, [i,j])
                                        : null}                              >
                                  {this.renderTile(cell)}
                              </td>)}
                              if(j===3||j===11){
                                  return(<td  className="TL2"
                                              key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)}
                                              onDrop = {cell === null?
                                                (e) => this.onDrop(e, [i,j])
                                                : null}
                                  >{this.renderTile(cell)}
                                  </td>)}
                              if(j===7){
                                  return(<td  className="ST2"
                                              key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)}                     onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}
                                  >{this.renderTile(cell)}
                                  </td>)}

                                  else{
                                  return(<td  className="normaltd"
                                              key={i * 15 + j}
                                              onDragOver={(e) => this.onDragOver(e)}
                                                                  onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}
                                  >
                                      {this.renderTile(cell)}
                                  </td>)
                              }
                          }) }
                          </tr>)
                      }
                else if (i===8||i===6) {
                    return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                        if(j===2||j===4||j===6||j===8||j===10||j===12){
                            return(<td  className="DL2"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)}
                        else{
                            return(<td  className="normaltd"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)
                        }
                    }) }
                    </tr>)
                }
                if (i===9||i===5) {
                    return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                        if(j===1||j===3||j===14||j===12){
                            return(<td  className="TL2"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)}
                        if(j===5||j===9){
                            return(<td  className="DW2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}

                        else{
                            return(<td  className="normaltd"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)
                        }
                    }) }
                    </tr>)
                }
                if (i===10||i===4) {
                    return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                        if(j===0||j===6||j===8||j===14){
                            return(<td  className="DL2"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)}
                        if(j===4||j===10){
                            return(<td  className="DW2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}
                        else{
                            return(<td  className="normaltd"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)
                        }
                    }) }
                    </tr>)
                }
                if (i===11||i===3) {
                    return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                        if(j===0||j===14){
                            return(<td  className="DL2"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)}
                        if(j===3||j===11){
                            return(<td  className="DW2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}
                        if(j===7){
                            return(<td  className="TL2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}

                        else{
                            return(<td  className="normaltd"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)
                        }
                    }) }
                    </tr>)
                }
                if (i===12||i===2) {
                    return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                        if(j===1||j===6||j===8||j===13){
                            return(<td  className="DL2"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)}
                        if(j===2||j===12){
                            return(<td  className="DW2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}
                        else{
                            return(<td  className="normaltd"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)
                        }
                    }) }
                    </tr>)
                }
                if (i===13||i===1) {
                    return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                        if(j===1||j===13){
                            return(<td  className="DW2"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)}
                        if(j===2||j===12){
                            return(<td  className="DL2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}
                        if(j===5||j===9){
                            return(<td  className="TL2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}


                        else{
                            return(<td  className="normaltd"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)
                        }
                    }) }
                    </tr>)
                }
                if (i===14||i===0) {
                    return(<tr className="ST" key={i}>{row.map((cell, j) =>{
                        if(j===0||j===14||j===7){
                            return(<td  className="TW2"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)}
                        if(j===3||j===4||j===10||j===11){
                            return(<td  className="TL2"
                                        key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} 
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >{this.renderTile(cell)}
                            </td>)}
                        else{
                            return(<td  className="normaltd"
                                        key={i * 15 + j}
                                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                            >
                                {this.renderTile(cell)}
                            </td>)
                        }
                    }) }
                    </tr>)
                }
            else{
                return(<tr className="normaltr" key={i}>{row.map((cell, j) =>{
                  return(<td className={this._tile_class_name(i, j)}
                                  key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, [i, j])}
                      >{
                          this.renderTileIJ(i,j,cell)
                       }
                      </td>)
                }) }
                </tr>)}
        }
        );
                

            let rackList = this.state.rackList;

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
                                    <tr>{
                                        rackList.map(tile => {
                                            return <td>{this.renderTile(tile)}</td>
                                        })
                                    }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button onClick={this.play.bind(this)}>Play</button>
                            <button onClick={this.pass.bind(this)}>Pass</button>
                            <button onClick={this.clear.bind(this)}>Clear</button>
                            {this.SwapPop()}
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