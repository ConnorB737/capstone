import React, { Component } from 'react';
import logo from "../letter/A.jpg";
export class A extends React.Component {
    constructor(props) {
        super(props);
        this.state={x:0,y:0}
    }
    //
    // fn(ev){
    //     var disx=ev.pageX-this.state.x
    //     var disy=ev.pageY-this.state.y
    //
    //     var _this=this
    //     document.onmousemove=function(ev){
    //         _this.setState({
    //             x:ev.pageX-disx,
    //             y:ev.pageY-disy
    //         })
    //     }
    //     document.onmouseup=function(){
    //         document.onmousemove=null
    //         document.onmousedown=null
    //     }
    // }

    // fnDown(e){
    //     let event= e||window.event;
    //     let target = event.target||event.srcElement;
    //     this.disX=event.clientX-target.offsetLeft;
    //     this.disY=event.clientY-target.offsetTop;
    //     document.onmousemove=this.fnMove.bind(this);
    //     document.onmouseup=this.fnUp(this);
    // }
    // fnMove(e){
    //     let event=e||window.event;
    //     let target=event.target||event.srcElement;
    //     this.setState({
    //        needX:event.clientX-this.disX,
    //        needY:event.clientY-this.disY
    //     });
    // }
    // fnUp(){
    //     document.onmousemove=null;
    //     document.onmouseup=null;
    // }

// {/*<div className="A" style={{left:this.state.x+'px',top:this.state.y+'px'}}*/}
// onMouseDown={this.fn.bind(this)}>
    render() {

        return (
            <input className="A"  type="button" style={{backgroundImage:`url(${logo})`}}>
                {}
            </input>
        )
    }
}


export default A;