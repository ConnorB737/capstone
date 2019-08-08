import React, { Component } from 'react';
import Square from './square';

export class Board extends React.Component {
    // render(i) {
    //     return <Square value={i} />;
    // }

    render() {
        const status = " Next player: X     ";
        const score ="   Total score:____"
        let gameBoard = []
        for (let i=0; i<15; i++){
            let children =[]
            for (let j=0; j<15; j++){
                children.push(<Square/>);
            }
            gameBoard.push(<div className="board-row">{children}</div>)
        }

        return (
            <div>
                <div className="status">{status}{score}</div>
                {gameBoard}
            </div>
        )
    }
}


export default Board;