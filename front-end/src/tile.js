import React, { Component } from 'react';
import Images from './imageCollection';


export class Tile extends Component {

    render() {

        return (
            <img id="tile" src={Images[this.props.value]} alt={this.props.value}/>
        )
    }
}

