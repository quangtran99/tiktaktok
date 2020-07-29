import React, { Component } from 'react'
import Board from "./components/Board" 
import "./App.css"

export default class App extends Component {
  constructor(props){
    super(props)


    this.state={
      username:"Quang",
      nextPlayer: true, //true: X False : )
      squareList: ['','','','','','','','',''],
      // array: Array(9).fill(null),
      winner: "",
      gameOver: false,
    }
  }

  setParentsState=(obj)=>{
    this.setState(obj)
  }

  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
    <h3>User name :{this.state.username}</h3>
  
    <Board squareList={this.state.squareList} 
           setParentsState={this.setParentsState}
           nextPlayer={this.state.nextPlayer}
           winner={this.state.winner}
           gameOver={this.state.gameOver} />
    <ol> History
      
    </ol>
    <ol>Ranking</ol>
      </div>
    )
  }
}
