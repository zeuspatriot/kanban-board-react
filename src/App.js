import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Column from './column_comp/columnComponent';
import AddColumn from './column_comp/addColumn';
import firebase from 'firebase';

class App extends Component {
  constructor(props){
    super(props);
    var self = this;
    firebase.database().ref().child('columns').on('value', function(snap){
        self.updateColumns(snap.val())
    });
    firebase.database().ref().child('cards').on('value', function(snap){
       self.updateCards(snap.val());
    });
    this.state = {
        cards: [],
        columns:[]
    };
    this.updateCards = this.updateCards.bind(this);
      this.updateColumns = this.updateColumns.bind(this);
      this.createCard = this.createCard.bind(this);
      this.moveCardLeft = this.moveCardLeft.bind(this);
      this.moveCardRight = this.moveCardRight.bind(this);
      this.addColumn = this.addColumn.bind(this);
  }
  updateColumns(value){
      this.setState(function(){
          return {
              columns: value
          }
      });
  }
  updateCards(cards){
      var newCards = Object.keys(cards).map(function(card){
          return cards[card];
      });
      this.setState(function(){
          return {
              cards: newCards
          }
      })
  }
  createCard(card){
      var newCardKey = firebase.database().ref().child('cards').push();
      card.id = newCardKey.key;
      newCardKey.set(card);
  }
  addColumn(colName){
      firebase.database().ref().child('columns').set(this.state.columns.concat(colName));
  }
  moveCardRight(cardId){
      let card = this.state.cards.find(function(card){return card.id === cardId});
      let cardCol = card.column;
      let colIndex = this.state.columns.indexOf(cardCol);
      let newCol = this.state.columns[colIndex + 1];
      if(colIndex === this.state.columns.length -1){
          return;
      }
      firebase.database().ref("cards/"+cardId).update({column:newCol});
  }
  moveCardLeft(cardId){
      let card = this.state.cards.find(function(card){return card.id === cardId});
      let cardCol = card.column;
      let colIndex = this.state.columns.indexOf(cardCol);
      let newCol = this.state.columns[colIndex - 1];
      if(colIndex === 0){
          return;
      }
      firebase.database().ref("cards/"+cardId).update({column:newCol});

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          {this.state.columns.map((columnName, index)=>{
            return <Column key={index} idIncrement={this.state.idIncr} name={columnName} cards={this.state.cards} createCard={this.createCard} moveLeft={this.moveCardLeft} moveRight={this.moveCardRight}/>})
          }
          <AddColumn addColumn={this.addColumn}/>
      </div>
    );
  }
}

export default App;
