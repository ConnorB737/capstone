import React, { Component } from 'react';
import logo from '../image/logo.png';
// import BScroll from 'better-scroll';
import rule1 from '../image/rule1.jpg';
import rule2 from '../image/rule2.jpg';

export class Help extends Component {

    render() {
        return (
            <div className="bgimg">

                <img style={{
                    position:'absolute'}} src={logo}/>
                <img style={{
                    position:'absolute',
                    width:'460px',
                    height:'550px',
                    marginLeft:'370px',
                    marginTop:'40px',
                    borderRadius:'10%',
                    boxShadow:"8px 8px 8px 0 #25170e"
                }} src={rule1}/>
                <img style={{
                position:'absolute',
                    width:'440px',
                    height:'550px',
                    borderRadius:'10%',
                    marginLeft:'870px',
                    marginTop:'40px',
                    boxShadow:"8px 8px 8px 0 #25170e"
                }} src={rule2}/>

            </div>
        );
    }

}
