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
        let boardSate = this.state.boardSate;
        boardSate = boardSate.map((row,i) => {
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
                        : null}}
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
                return(<tr  className="normaltr" key={i}>{row.map((cell, j) =>
                    <td className="normaltd"
                        key={i * 15 + j}
                        onDragOver={(e) => this.onDragOver(e)}
                    onDrop = {cell === null?
                        (e) => this.onDrop(e, [i,j])
                        : null}                    >
                        {this.renderTile(cell)}
                    </td>)}
                </tr>)

            }
        }
        );
        return (
            <div id="board">

                    <table >
                        <tbody>
                            {boardSate}
                        </tbody>
                    </table>

    
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