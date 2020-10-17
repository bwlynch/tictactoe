import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.fillIn = this.fillIn.bind(this);
    //this.state = {value: null};
  }

  fillIn(e) {
    if (this.props.insideValue === null && this.props.done === false) {
      //this.setState({value: this.props.player});
      this.props.recordMove(this.props.value)
      //this.props.switchPlayer();
    }
  }

  render() {
    return (
      <button className="square" onClick={this.fillIn}>
        {this.props.insideValue}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.recordMove = this.recordMove.bind(this);
    this.initialize = this.initialize.bind(this);
    let newState = this.initialState();
    this.state = newState;
  }

  initialState()
  {
    let emptyBoard = [];
    for (let i = 0; i < 9; i++) {
      emptyBoard.push(null);
    }
    return {player: 'X', done: false, plays: emptyBoard, winner: null};
  }

  renderSquare(i) {
    return <Square value={i} done={this.state.done} recordMove={this.recordMove} player={this.state.player} insideValue={this.state.plays[i]} />;
  }

  recordMove(squareNum) {
    let prevPlays = this.state.plays;
    prevPlays[squareNum] = this.state.player;
    this.setState({plays: prevPlays});
    this.setState((state, props) => ({player: state.player === 'X' ? 'O' :'X'}));
    const winningLines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    let gameDone = false;
    var j;
    for (j of winningLines)
    {
      /*let x = this.state.plays;
      console.log(x[0]);
      console.log(this.state.plays[0]);
      console.log(j[0]);
      console.log(x[j[0]]);
      console.log(this.state.plays[j[0]]);*/
      if (this.state.plays[j[0]] != null && this.state.plays[j[0]] === this.state.plays[j[1]] && this.state.plays[j[1]] === this.state.plays[j[2]])
      {
        this.setState({done: true, winner: this.state.plays[j[0]]});
	gameDone = true;
      }
    }

    if (gameDone === false)
    {
      var i;
      var finished = true;
      for (i in this.state.plays)
      {
        finished = this.state.plays[i] === null ? false : finished;
      }
      //console.log(finished);
      if (finished === true)
      {
        this.setState({done: true, winner: 'tie'});
      };
    }
  }

  initialize() {
    let resetState;
    resetState = this.initialState();
    this.setState(resetState);
  }

  render() {
    const tieMessage = "It's a tie!"
    const status = this.state.done === false ?
      'Next player: ' + this.state.player :
      this.state.winner === 'tie' ? <b>{tieMessage}</b> : <b>Player {this.state.winner} won!</b>;
    const replayButton = this.state.done === true ? <button  onClick={this.initialize}>Play Again!</button> : null;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="replay">
          {replayButton}
	</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

