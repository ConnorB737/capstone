import React, { Component } from 'react';
import { Tile } from './tile';
import words from './words.json';
import specialTiles from "./specialTiles.json";
import Popup from "reactjs-popup";

const SPECIAL_TILE_PLACEMENT = specialTiles["specialTiles"];

const DIRECTION = {
    NOT_PLACED: -1,
    RIGHT: 0,
    DOWN: 1,
};

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swapList: [], // array of index related to the rackList that need to be send to backend and remove from it.
            player: {
                name: "",
                score: 0,
            },
            opponent: {},
            
            word: {
                direction: [DIRECTION.NOT_PLACED], 
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
		 } else if (this.state.word.direction[0] === DIRECTION.NOT_PLACED){ //if a direction hasn't been set (usually second move)
			if(droppedTileX === placedTiles[0]['x'] && isValidPlacement(DIRECTION.DOWN)){ 
                if(tempBoardState[droppedTileY][droppedTileX] == null){
                    this.state.word.direction[0] = DIRECTION.DOWN;
                    placeTileOnBoard({
                        x: droppedTileX,
                        y: droppedTileY,
                        value: value
                    });
                    tempBoardState[droppedTileY][droppedTileX] = value;
                }
			} else if (droppedTileY === placedTiles[0]['y'] && isValidPlacement(DIRECTION.RIGHT)){
                if(tempBoardState[droppedTileY][droppedTileX] == null){
                    this.state.word.direction[0] = DIRECTION.RIGHT;
                    placeTileOnBoard({
                        x: droppedTileX,
                        y: droppedTileY,
                        value: value
                    });
                    tempBoardState[droppedTileY][droppedTileX] = value;
                }
			}
		} else if (this.state.word.direction[0] === DIRECTION.DOWN) { //if going vertically
			if (droppedTileX === placedTiles[0]['x'] && isValidPlacement(DIRECTION.DOWN)){ //and make sure that there is a tiles between either side of the placement
                placeTileOnBoard({
                    x: droppedTileX,
                    y: droppedTileY,
                    value: value
                });
				tempBoardState[droppedTileY][droppedTileX] = value;
			}
		} else if (this.state.word.direction[0] === DIRECTION.RIGHT) { //same deal but horizontally
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

    handleSwapClick = (event, i) => {
        let temp = []
        if (this.state.swapList.length === 0) {
            if (event.target.id==="tile") {
                event.target.id="newTile"
                temp.push(i)
                this.setState({swapList:temp})
            }
        } else {
            if (event.target.id === "newTile") {
                event.target.id="tile"
                temp = []
                this.setState({swapList:temp})
            }
        }
    };

    handleSwapSend = () => {
        // Assume I have the tile/s to send
        const index = this.state.swapList; // Get the tile/s
        const tile = this.props.rack[index]
        console.log("tile to swap: ", tile)
        this.props.swapTile(this.props.socket, tile);
    };

    SwapPop = () => {
        let rackBar = this.props.rack.map((cell,i) =>
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
    };

    play() {
        var placedTiles = this.state.word.placedTiles;
        var direction = this.state.word.direction[0];
        var wordList = this.state.wordList;
        
        var board = this.props.serverBoard;
        
        let allTiles = [];
        
        function checkAdjacentWords(tilesToCheck, dir){
            let returnVal = true;
            if (dir === DIRECTION.RIGHT) { //then the words are going to be going vertically
                tilesToCheck.forEach(t => {
                    let letters = [];
                    
                    let startY = t['y'];
                    while (startY > 0 && board[startY - 1][t['x']] != null){
                        startY -= 1;
                    }

                    let endY = t['y'];
                    while (endY < 14 && board[endY + 1][t['x']] != null){
                        endY += 1;
                    }
                    
                    for (let c = startY; c <= endY; c++){
                        letters.push(board[c][t['x']]);
                    }
                    console.log(letters.join(""));
                    if (!wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
            } else if (dir === DIRECTION.DOWN) {
                tilesToCheck.forEach(t => {
                    let letters = [];
                    
                    let startX = t['x'];
                    while (startX > 0 && board[t['y']][startX - 1] != null){
                        startX -= 1;
                    }

                    let endX = t['x'];
                    while (endX < 14 && board[t['y']][endX + 1] != null){
                        endX += 1;
                    }
                    
                    for (let c = startX; c <= endX; c++){
                        letters.push(board[t['y']][c]);
                    }
                    console.log(letters.join(""));
                    if (!wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
            } else { //check both directions -- usually when only one letter has been placed
                tilesToCheck.forEach(t => {
                    let letters = [];
                    
                    let startX = t['x'];
                    while (startX > 0 && board[t['y']][startX - 1] != null){
                        startX -= 1;
                    }

                    let endX = t['x'];
                    while (endX < 14 && board[t['y']][endX + 1] != null){
                        endX += 1;
                    }
                    
                    for (let c = startX; c <= endX; c++){
                        letters.push(board[t['y']][c]);
                    }
                    console.log(letters.join(""));
                    if (letters.join("").length > 1 && !wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
                tilesToCheck.forEach(t => {
                    let letters = [];
                    
                    let startY = t['y'];
                    while (startY > 0 && board[startY - 1][t['x']] != null){
                        startY -= 1;
                    }

                    let endY = t['y'];
                    while (endY < 14 && board[endY + 1][t['x']] != null){
                        endY += 1;
                    }
                    
                    for (let c = startY; c <= endY; c++){
                        letters.push(board[c][t['x']]);
                    }
                    console.log(letters.join(""));
                    if (letters.join("").length > 1 && !wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
            }
            return returnVal;
        }
        
        

        //sorts the coords in order of their i or j coordinate depending on the direction
        let adjacentTiles = [];
        if(direction === DIRECTION.NOT_PLACED){
             if((placedTiles[0]['y'] - 1 >= 0 && board[placedTiles[0]['y'] - 1][placedTiles[0]['x']] != null) || 
                (placedTiles[0]['y'] + 1 <= 14 && board[placedTiles[0]['y'] + 1][placedTiles[0]['x']] != null)) {
                direction = DIRECTION.DOWN;
                } else {
                    direction = DIRECTION.RIGHT;
                }
        }
         if (direction === DIRECTION.RIGHT) { //horizonal
            placedTiles = placedTiles.sort((a, b) => a['x'] - b['x']);
            let startX = placedTiles[0]['x'];
            while (startX > 0 && board[placedTiles[0]['y']][startX - 1] != null){
                startX -= 1;
            }
            
            let endX = placedTiles[placedTiles.length-1]['x'];
            while (endX < 14 && board[placedTiles[0]['y']][endX + 1] != null){
                endX += 1;
            }

            for (let c = startX; c <= endX; c++){
                allTiles.push({
                                y: placedTiles[0]['y'],
                                x: c,
                                value: board[placedTiles[0]['y']][c]
                            });
                if((placedTiles[0]['y'] - 1 >= 0 && board[placedTiles[0]['y'] - 1][c] != null) || 
                (placedTiles[0]['y'] + 1 <= 14 && board[placedTiles[0]['y'] + 1][c] != null)) { //if there are tiles adjacent to the word
                    adjacentTiles.push({
                                y: placedTiles[0]['y'],
                                x: c,
                                value: board[placedTiles[0]['y']][c]
                            });
                }
            }
            
         } else if (direction === DIRECTION.DOWN) {//vertical
            placedTiles = placedTiles.sort((a, b) => a['y'] - b['y']);
            
            let startY = placedTiles[0]['y'];
            while (startY > 0 && board[startY - 1][placedTiles[0]['x']] != null){
                startY -= 1;
            }

            let endY = placedTiles[placedTiles.length-1]['y'];
            while (endY < 14 && board[endY + 1][placedTiles[0]['x']] != null){
                endY += 1;
            }
            
            for (let c = startY; c <= endY; c++){
                allTiles.push({
                                y: c,
                                x: placedTiles[0]['x'],
                                value: board[c][placedTiles[0]['x']]
                            });
                if((placedTiles[0]['x'] - 1 >= 0 && board[c][placedTiles[0]['x'] - 1] != null) || 
                (placedTiles[0]['x'] + 1 <= 14 && board[c][placedTiles[0]['x'] + 1] != null)) { //if there are tiles adjacent to the word
                    adjacentTiles.push({
                                y: c,
                                x: placedTiles[0]['x'],
                                value: board[placedTiles[0]['y']][c]
                            });
                }
            }
        }
        
        //as the word is now in order, we can simply take each letter to construct our word
        const combinedWord = allTiles.map(tile => tile['value']).join("");
        console.log(combinedWord);
        if ((combinedWord.length <= 1 || wordList.includes(combinedWord)) && checkAdjacentWords(adjacentTiles, direction)) { //if valid word, place it on the server and reset the state to place your next word
            this.props.placeWord(this.props.socket, combinedWord, this.state.word.direction[0], allTiles);
            this.clear();
        } else { 
            alert("Invalid word!");
        }
    }

    clear() {
        this.state.word.direction[0] = DIRECTION.NOT_PLACED;
        this.state.word.placedTiles.length = 0; //delete all tiles
        this.props.getBoard(this.props.socket);
    }

    pass() {

    }


    render() {
        if (this.props.serverBoard) {
            const boardState = this.props.serverBoard.map((row,i) => {
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
            if (this.props.rack != null) {
                rackList = this.props.rack.map(tile => {
                    return <td>{this.renderTile(tile)}</td>
                })
            }

            let swapPopUp = [];
            console.log(this.props.rack);
            if (this.props.rack != null) {
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
