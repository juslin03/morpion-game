import React, { Component } from "react";
import ReactDOM from "react-dom";
import swal from "@sweetalert/with-react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import Board from "./components/Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "M" : "J";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const data = {
      styles: {fontSize: '20px'},
      ticTacToe: "MORPION GAME"
    }
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? "Revenir au tour N° " + move
        : "Revenir au début de la partie";
      return (
        <li className="part-list" key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    status = winner
      ? swal({
          title: "Bravo, " + winner + " a gagné !",
          icon: "success",
          button: "Rejouer !"
        }).then(_reload)
      : "Prochain joueur : " + (this.state.xIsNext ? "M" : "J");
    return (
      <div className="game-wrapper">
        <h1 style={data.styles}>{data.ticTacToe}</h1>
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

// ======================================== //

ReactDOM.render(<Game />, document.getElementById("root"));

// declarer un vainqueur
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// reloading page
const _reload = () => window.location.reload();