import React, { Component } from 'react';
import Images from './imageCollection';


export class Tile extends Component {

    onDragStart = (ev, value) => {
        ev.dataTransfer.setData("value", value)
    }

    render() {

        return (
            <img 
            id="tile" 
            src={Images[this.props.value]} 
            alt={this.props.value} 
            draggable
            onDragStart = {(e) => this.onDragStart(e, this.props.value)}
            />
        )
    }
}

