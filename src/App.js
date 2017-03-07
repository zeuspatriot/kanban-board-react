import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Column from './column_comp/columnComponent';
import AddColumn from './column_comp/addColumn';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        idIncr: 3,
        cards: [{title: 'First column', id: 1, content: 'Some fresh preset content', column:'first'},{title: 'Second column', id: 2, content: 'Some fresh preset content', column:'second'}],
        columns:["first", "second"]
    };
    this.createCard = this.createCard.bind(this);
    this.moveCardLeft = this.moveCardLeft.bind(this);
    this.moveCardRight = this.moveCardRight.bind(this);
    this.addColumn = this.addColumn.bind(this);
  }
  createCard(card){
      this.setState(prevState => ({
          cards: prevState.cards.concat(card),
          idIncr: prevState.idIncr + 1
      }));

  }
  addColumn(colName){
      console.log("AppFunc Called with: ", colName);
      this.setState(prevState => ({
          columns: prevState.columns.concat(colName)
      }));
      console.log(this.state.columns);
  }
  moveCardRight(cardId){
      this.setState(function(prevState){
          let card = prevState.cards.find(function(card){return card.id == cardId});
          let cardIndex = prevState.cards.indexOf(card);
          let cardCol = prevState.cards[cardIndex].column;
          let colIndex = prevState.columns.indexOf(cardCol);
          if(colIndex === prevState.columns.length -1){
              return;
          }
          let newState = Object.assign({}, prevState);
          newState.cards[cardIndex].column = prevState.columns[colIndex + 1];
          return {
              prevState: newState
          }
      })
  }
  moveCardLeft(cardId){
      this.setState(function(prevState){
          let card = prevState.cards.find(function(card){return card.id == cardId});
          let cardIndex = prevState.cards.indexOf(card);
          let cardCol = prevState.cards[cardIndex].column;
          let colIndex = prevState.columns.indexOf(cardCol);
          if(colIndex === 0){
              return;
          }
          let newState = Object.assign({}, prevState);
          newState.cards[cardIndex].column = prevState.columns[colIndex - 1];
          return {
            prevState: newState
          }
      })
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
          {this.state.columns.map((columnName)=>{
            return <Column key={columnName.index} idIncrement={this.state.idIncr} name={columnName} cards={this.state.cards} createCard={this.createCard} moveLeft={this.moveCardLeft} moveRight={this.moveCardRight}/>})
          }
          <AddColumn addColumn={this.addColumn}/>
      </div>
    );
  }
}

export default App;
