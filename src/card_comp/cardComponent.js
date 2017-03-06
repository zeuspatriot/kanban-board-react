import React, { Component } from 'react';

class Card extends Component{
    constructor(props){
        super(props);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }
    moveLeft(){
        this.props.moveLeft(this.props.id);
    }
    moveRight(){
        this.props.moveRight(this.props.id);
    }
    render(){
        return (
            <div className="card">
                <span>{this.props.title}</span>
                <hr/>
                <span>{this.props.content}</span>
                <br/>
                <div>
                    <button onClick={this.moveLeft}>Move Left</button>
                    <button onClick={this.moveRight}>Move Right</button>
                </div>
            </div>

        )
    }
}
export default Card;