import React, { Component } from 'react';
import logo from '../image/logo.png';
// import BScroll from 'better-scroll';
import rule1 from '../image/rule1.jpg';
import rule2 from '../image/rule2.jpg';

export class Help extends Component {

    render() {
        return (
            <div className="bgimg">
                <div style={{ 
                    width: '1000px',
                    margin: '0 auto'
                    }}>
                    <div style={{
                        width: '100%',
                        textAlign: 'center'
                    }}>                
                <img src={logo}/>
                </div>
                    <img style={{
                        margin: '10px',
                        width:'460px',
                        height:'550px',
                        float: 'left',
                        borderRadius:'10%',
                        boxShadow:"8px 8px 8px 0 #25170e"
                    }} src={rule1}/>
                    <img style={{
                        margin: '10px',
                        width:'440px',
                        height:'550px',
                        borderRadius:'10%',
                        float: 'left',
                        boxShadow:"8px 8px 8px 0 #25170e"
                    }} src={rule2}/>
                </div>
            </div>
        );
    }

}
