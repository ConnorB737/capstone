import React, { Component } from 'react';
import { Tile } from './tile';

class Board extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            rackList: ['A','B','C','D','E','F','G','H','I','J','K'],
            boardState: Array(15).fill(0).map(row => new Array(15).fill(null)),
            player: {
                name: "",
                score: 0,
            },
            opponent: {},
			direction:-1, //direction is -1 before a tile has been placed, 0 if the word is going right, 1 if the word is going down
			lastX:-1, //-1 until placed, but will be the last tile's position
			lastY:-1,
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
		if(this.state.lastX === -1 || this.state.lastY === -1){ //checks whether first tile placed
			 temState[i][j] = value;
		 } else if (this.state.direction === -1){ //checks whether a direction has been set (usually second move)
			if(i === this.state.lastX - 1 || i === this.state.lastX + 1){
				this.setState({
					direction: 1, //the word is going vertically
				});
				temState[i][j] = value;
			} else if (j === this.state.lastY - 1 || j === this.state.lastY + 1){
				this.setState({
					direction: 0, //the word is going horizontally
				});
				temState[i][j] = value;
			}
		} else if (this.state.direction === 1) { //if going vertically,
			if (j === this.state.lastJ && //make sure is on the same j coordinate, 
				(temState[i - 1][j] != null || temState[i + 1][j] != null)){ //and make sure that there is a tile on either side of the placement
				temState[i][j] = value;
			}
		} else if (this.state.direction === 0) { //same deal but horizontally
			if (i === this.state.lastX && 
				(temState[i][j - 1] != null || temState[i][j + 1] != null)){
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