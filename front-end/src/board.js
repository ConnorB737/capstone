import React, { Component } from 'react';
import { Tile } from './tile';
import words from './words.json';

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


class Board extends Component {



    constructor(props) {
        super(props);
        this.state = {
            rackList: ['A','B','C','D','E','F','G','H','I','J','K'],
            boardState: Array(15).fill(0).map(row => new Array(15).fill(null)),
            player: {
                name: "",
                score: 0,
            },
            opponent: {},
            
            word: {
                direction:-1, //direction is -1 before a tile has been placed, 0 if the word is going right, 1 if the word is going down
                coords: [], //contains the coords of each tile
            },
            
            wordList: words["wordList"],
        }
    }
    
    renderTile(cell){
        return <Tile value={cell} />
    }
    
    renderTileIJ(i,j,cell) {
        let coords = this.state.word.coords;
        for(let x = 0; x < coords.length; x++){
          if (i === coords[x][0] && j === coords[x][1]){
                return <Tile value={coords[x][2]} />
           }
        }
        return <Tile value={cell} />
    }

    onDragOver(ev) {
        ev.preventDefault();
    }

    onDrop(ev, coordinate) {
        let value = ev.dataTransfer.getData("value");
        
        let temState = JSON.parse(JSON.stringify(this.state.boardState)); //cloning the object, as opposed to referencing it
        let i=coordinate[0];
        let j=coordinate[1];
        
		
		//this part of the code handles the checking of whether you're placing tiles in a logical order
		//it won't let you place tiles randomly, 
		//but instead enforces that tiles are inline horizontally or vertically
		//and all touching
        
        var coords = this.state.word.coords;
        
        function isValidPlacement(dir){
            //checks whether there is a straight line of tiles from the first tile you've placed,
            //to the last tile you've placed
            //i.e. no gaps
            
            //assumes the first tile has been placed 
            let tempCoords = coords;
            let firstTile = coords[0];
            //check that it isn't in the tempCoords
            for(let x = 0; x < coords.length; x++){
                if (i === coords[x][0] && j === coords[x][1]){
                    return false;
                }
            }
            if(dir === 1){ //vertically
                let diff = firstTile[0] - i;
                if(diff > 0) { //tile is above first tile
                    //diff -= 1; //because the temState of the tile placed should be null
                    for (let x = 1; x < diff; x++){
                        if(temState[firstTile[0] - x][j] == null){
                            return false; //is not placable
                        }
                        
                        let isTileInCoords = false; //adds all tiles between clicks to the word
                        for (let x = 0; x < coords.length; x++){
                            if(firstTile[0] - x === coords[x][0] && j === coords[x][1]){
                                isTileInCoords = true;
                            }
                        }
                        if(!isTileInCoords){
                            tempCoords.push([firstTile[0] - x, j, temState[firstTile[0] - x][j]]);
                        }
                    }
                } else if (diff < 0) { //tile is below first tile
                    //diff += 1;
                    for (let x = 1; x < -diff; x++){
                        if(temState[firstTile[0] + x][j] == null){
                            return false; //is not placable
                        }
                        
                        let isTileInCoords = false; //adds all tiles between clicks to the word
                        for (let x = 0; x < coords.length; x++){
                            if(firstTile[0] + x === coords[x][0] && j === coords[x][1]){
                                isTileInCoords = true;
                            }
                        }
                        if(!isTileInCoords){
                            tempCoords.push([firstTile[0] + x, j, temState[firstTile[0] + x][j]]);
                        }
                    }
                }
            } else if (dir === 0) { //horizonally 
                let diff = firstTile[1] - j;
                    if(diff > 0) { //tile is behind first tile
                        //diff -= 1;
                        for (let x = 1; x < diff; x++){
                            if(temState[i][firstTile[1] - x] == null){
                                return false; //is not placable
                            }
                            
                            let isTileInCoords = false; //adds all tiles between clicks to the word
                            for (let x = 0; x < coords.length; x++){
                            if(i === coords[x][0] && firstTile[1] - x === coords[x][1]){
                                isTileInCoords = true;
                            }
                            }
                            if(!isTileInCoords){
                                tempCoords.push([i, firstTile[1] - x, temState[i][firstTile[1] - x]]);
                            }
                        }
                        
                        
                    } else if (diff < 0) { //tile is in front of first tile
                        //diff += 1;
                        for (let x = 1; x < -diff; x++){
                            if(temState[i][firstTile[1] + x] == null){
                                return false; //is not placable
                            }
                            
                        let isTileInCoords = false; //adds all tiles between clicks to the word
                        for (let x = 0; x < coords.length; x++){
                            if(i === coords[x][0] && firstTile[1] + x === coords[x][1]){
                                isTileInCoords = true;
                            }
                        }
                        if(!isTileInCoords){
                            tempCoords.push([i, firstTile[1] + x, temState[i][firstTile[1] + x]]);
                        }
                    }
                }
            }
            coords = tempCoords;
            return true;
        }
        
		if(coords.length === 0){ //checks whether first tile placed, and whether the spot is free
            if(temState[i][j] == null){
                coords.push([i, j, value]);
                temState[i][j] = value;
            }
		 } else if (this.state.word.direction === -1){ //if a direction hasn't been set (usually second move)
			if(j === coords[0][1] && isValidPlacement(1)){ //coords[0][1] is the first tile placed 'j' coordinate
                if(temState[i][j] == null){
                    this.setState({
                        word: {
                            ...this.state.word,
                            direction: 1, //the word is going vertically
                    }});
                    coords.push([i, j, value]);
                    temState[i][j] = value;
                }
			} else if (i === coords[0][0] && isValidPlacement(0)){ //coords[0][0] is the first placed 'i' coordinate
                if(temState[i][j] == null){
                    this.setState({
                        word: {
                            ...this.state.word,
                            direction: 0, //the word is going horizontally
                    }});
                    coords.push([i, j, value]);
                    temState[i][j] = value;
                    }
                }
		} else if (this.state.word.direction === 1) { //if going vertically
			if (j === coords[0][1] && isValidPlacement(1)){ //and make sure that there is a tiles between either side of the placement
                coords.push([i, j, value]);
				temState[i][j] = value;
			}
		} else if (this.state.word.direction === 0) { //same deal but horizontally
			if (i === coords[0][0] && isValidPlacement(0)){
                coords.push([i, j, value]);
				temState[i][j] = value;
			}
		}
		
		this.setState({
			lastX: i,
			lastY: j,
		})
		console.log(this.state);
		console.log(i, j);
		
		//temState[i][j] = value;
			
        // this.setState({
            // boardState: temState,
        // })
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

    play() {

        var coords = this.state.word.coords;
        var dir = this.state.word.direction;

        //sorts the coords in order of their i or j coordinate depending on the direction
         if (dir === 0) { //horizonal
            coords = coords.sort((a, b) => a[1] - b[1]);
         } else if (dir === 1) {//vertical
            coords = coords.sort((a, b) => a[0] - b[0]);
        }

        //as the word is now in order, we can simply take each letter to construct our word
        let txt = "";
        for (let x = 0; x < coords.length; x++){
                txt += coords[x][2];
            }
        if(this.state.wordList.includes(txt)){ //if valid word, place it on the server and reset the state to place your next word
            this.props.placeWord(this.props.socket, txt, this.state.word.direction, this.state.word.coords);
            this.setState({
                word: {
                    direction:-1, //direction is -1 before a tile has been placed, 0 if the word is going right, 1 if the word is going down
                    coords: [], //contains the coords of each tile
                },
            })
        } else { 
            alert("Invalid word!");
        }
    }

    clear() {
        this.setState({
                word: {
                    direction:-1, //direction is -1 before a tile has been placed, 0 if the word is going right, 1 if the word is going down
                    coords: [], //contains the coords of each tile
                },
            })
    }

    pass() {
        //not elegant or beautiful, will need refactoring. 
        //primarily getting something to show in the week 8 presentation
        function serverBoardToFrontendBoard(serverBoard) {
            let boardArray = serverBoard.split(" ");
            let newBoard = Array(15).fill(0).map(row => new Array(15).fill(null));
            if(serverBoard !== "yo"){
                for(var x = 0; x < 15*15-1; x++){
                    if(boardArray[x] === "null")
                        newBoard[parseInt(x / 15)][x % 15] = "";
                    else
                        newBoard[parseInt(x / 15)][x % 15] = boardArray[x].replace("\"","").replace("\"",""); //because the javascript replace function only replaces the first value found
                }
            }
            return newBoard;
        }
        
        alert("Loading Server Board");
        this.setState({
            boardState: serverBoardToFrontendBoard(this.props.serverBoard),
        })
    }
    
    render() {
        let boardState = this.state.boardState;
        //let boardState = serverBoardToFrontendBoard(this.props.serverBoard);
        boardState = boardState.map((row,i) => {
            return(<tr className="normaltr" key={i}>{row.map((cell, j) =>{
              return(<td className={this._tile_class_name(i, j)}
                              key={i * 15 + j} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, [i, j])}
                  >{
                      this.renderTileIJ(i,j,cell)
                   }
                  </td>)
            }) }
            </tr>)}
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
                        <button onClick={this.play.bind(this)}>Play</button>
                        <button onClick={this.pass.bind(this)}>Pass</button>
                        <button onClick={this.clear.bind(this)}>Clear</button>
                        <button>Swap</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Board;