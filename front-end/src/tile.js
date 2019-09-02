import React, { Component } from 'react';
import Images from './imageCollection';


export class Tile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            canDrag: true,
        }
    }

    onDragStart = (ev, value) => {
        ev.dataTransfer.setData("value", value)
    }

    onDragEnd = () => {
        this.setState(
            {canDrag: false}
        )
    }

    render() {

        return (
            <img 
            id="tile" 
            src={Images[this.props.value]} 
            alt={this.props.value} 
            draggable
            onDragStart = {this.state.canDrag === true
                ? (e) => this.onDragStart(e, this.props.value)
                : null
            }
            onDrop = {() => this.onDragEnd()}
            />
        )
    }
}

