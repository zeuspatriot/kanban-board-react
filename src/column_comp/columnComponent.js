import React, { Component } from 'react';
import Card from '../card_comp/cardComponent';

class Column extends Component{
    constructor(props){
        super(props);
        this.createCard = this.createCard.bind(this);
        this.toggleNewCard = this.toggleNewCard.bind(this);
        this.state = {
            newCardToggle: false
        };
    }
    createCard(event){
        event.preventDefault();
        this.props.createCard({title: event.target.title.value, content: event.target.content.value, column: this.props.name});
        event.target.reset();
        this.toggleNewCard();
    }
    toggleNewCard(){
        this.setState(function(prevState){
            return {newCardToggle: !prevState.newCardToggle}
        })
    }
    render(){
        let newCard;
        if(this.state.newCardToggle){
            newCard = (
                <div className="newCard">
                    <form onSubmit={this.createCard}>
                        <label htmlFor="title">Card Title</label>
                        <input type="text" id="title" name="title"/>
                        <br/>
                        <label htmlFor="content">Card Content</label>
                        <input type="text" id="content" name="content"/>
                        <button type="submit">Create new card</button>
                    </form>
                </div>
            )
        }
        else{
            newCard = <button onClick={this.toggleNewCard}>Add new Card</button>
        }
        return (
            <div className="column">
                <h2>{this.props.name}</h2>
                {newCard}

                {this.props.cards.filter((card) => {
                    return card.column === this.props.name;
                }).map((card) => {
                    return <Card key={card.id} id={card.id} title={card.title} content={card.content} moveLeft={this.props.moveLeft} moveRight={this.props.moveRight}/>
                })}
            </div>
        )
    }
}

export default Column;