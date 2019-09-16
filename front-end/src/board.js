import React, { Component } from 'react';
import { Tile } from './tile';

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
        let temState = this.state.boardState;
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

		this.props.placeWord(this.props.socket, value, this.state.word.direction, this.state.word.coords);
		
		this.setState({
			lastX: i,
			lastY: j,
		})
		console.log(this.state);
		console.log(i, j);
		
		//temState[i][j] = value;
			
        this.setState({
            boardState: temState,
        })
    }

    findWord = () => {
        
    }

    render() {
        let boardState = this.state.boardState;
        let board = boardState.map((row,i) => 
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
        
        var coords = this.state.word.coords;
        var dir = this.state.word.direction;
        function play() { 
        //turns our word into a suitable format for the server, and sends it
        //has yet to test whether the word is valid
            
         // //this first part is finding the I, J coordinates of the first tile in the word
            // var lowestI = 0;
            // var lowestJ = 0;
            // if (dir === 0){ //horizontal
                // lowestJ = coords[0][1];
                // for (let x = 0; x < coords.length; x++){
                    // if (coords[x][1] < lowestJ) {
                        // lowestJ = coords[x][1];
                    // }
                // }
                // lowestI = coords[0][0]; //should all have the same J coords
            // } else if (dir === 1){ //vertical
                // lowestI = coords[0][0];
                // for (let x = 0; x < coords.length; x++){
                    // if (coords[x][0] < lowestI) {
                        // lowestI = coords[x][0];
                    // }
                // }
                // lowestJ = coords[0][1];
            // }
        
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
            alert(txt);
        }
        
        function clear() { alert("Clear!"); }
        
        const sBoard = this.props.serverBoard;
        function pass() {
            alert(sBoard);
        }

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
                        <button onClick={play}>Play</button>
                        <button onClick={pass}>Pass</button>
                        <button onClick={clear}>Clear</button>
                        <button>Swap</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Board;