import React, { Component } from 'react'
import Board from "./components/Board"
import "./App.css"
import FacebookLogin from 'react-facebook-login';
import { Col, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  constructor(props) {
    super(props)


    this.state = {
      username: "Quang",
      nextPlayer: true, //true: X False : )
      squareList: ['', '', '', '', '', '', '', '', ''],
      // array: Array(9).fill(null),
      winner: '',
      gameOver: false,
      history: [],
    }
  }

  setParentsState = (obj) => {
    this.setState(obj)
  }

  postData = async () => {
    let data = new URLSearchParams();
    data.append("player", "Quang");
    data.append("score", "10");
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    this.getData();
  }

  getData = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url)
    let result = await data.json()
    console.log("abc", result)
    this.setState({
      ...this.state,
      otherPlayers: result.items
      // otherScore:result.item.score
    })
  }

  componentDidMount() {
    this.getData()
  }



  backToPast = (index) => {
    //1. grab the histroy
    let past = this.state.history[index];
    //2. change the value squareList,nextPlayer
    this.setState({
      ...this.state,
      squareList: past.squareList,
      nextPlayer: past.nextPlayer,
    });
  };

  responseFacebook = (response) => {
    console.log(response);
    this.setState({ userName: response.name })
    this.setState({ picture: response.picture.data.url })
  }


  render() {
    return (
      <div>
        <div className="App">
          <FacebookLogin

            appId="625332178106288"
            fields="name,email,picture"
            callback={(resp) => this.responseFacebook(resp)}
          />
        </div>
        <div>
          <h1>Tic Tac Toe</h1>
          {this.state.otherPlayers ? this.state.otherPlayers.map((item) => item.player) : null}
          {this.state.otherPlayers ? this.state.otherPlayers.map((item) => item.score) : null}
          <span ><img src={this.state.picture} className="login-style" /></span>
          <h3>Playing Player:{this.state.userName}</h3>

          <Board

            postData={this.postData}
            squareList={this.state.squareList}
            setParentsState={this.setParentsState}
            nextPlayer={this.state.nextPlayer}
            winner={this.state.winner}
            gameOver={this.state.gameOver}
            {...this.state} />
          <ol>
            History
          {this.state.history.map((_, index) => {
            return (
              <li>
                <button onClick={() => this.backToPast(index)}>
                  Go To:{index + 1}
                </button>
              </li>
            );
          })}
          </ol>
          <Row className="scoll-style set-bottom">
                  <ol> <span style={{ fontWeight: "bold" }}>Ranking</span>
                    {this.state.otherPlayers ? this.state.otherPlayers.map((item, index) => {
                      return (
                        <Row>
                          <Col>Player: {item.player}</Col>
                          <Col>Score: {item.score}</Col>
                        </Row>
                      )

                    }) : null}

                  </ol>
                </Row>

        </div>
      </div>
    )
  }
}
