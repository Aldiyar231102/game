import React, { Component } from 'react';
import './App.css';
import CongratulationsModal from './CongratulationsModal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: 1,
      player1Current: 0,
      player1Total: 0,
      player2Current: 0,
      player2Total: 0,
      diceValue: 1,
      gameStarted: false,
      gameOver: false,
      winner: null,
      showModal: false,
    };
  }

  rollDice = () => {
    if (this.state.gameOver) return;

    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    this.setState({ diceValue: newDiceValue });

    if (newDiceValue === 1) {
      this.setState({ currentPlayer: this.state.currentPlayer === 1 ? 2 : 1 });
    } else {
      const currentKey = `player${this.state.currentPlayer}Current`;
      this.setState((prevState) => ({
        [currentKey]: prevState[currentKey] + newDiceValue,
      }));
    }
  };

  hold = () => {
    if (this.state.gameOver) return;

    const currentKey = `player${this.state.currentPlayer}Current`;
    const totalKey = `player${this.state.currentPlayer}Total`;

    this.setState((prevState) => ({
      [totalKey]: prevState[totalKey] + prevState[currentKey],
      [currentKey]: 0,
      currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
    }));

    if (this.state[totalKey] + this.state[currentKey] >= 100) {
      const winner = this.state.currentPlayer === 1 ? 2 : 1;
      this.setState({
        gameOver: true,
        winner,
        showModal: true,
      });
    }
  };

  startNewGame = () => {
    this.setState({
      currentPlayer: 1,
      player1Current: 0,
      player1Total: 0,
      player2Current: 0,
      player2Total: 0,
      diceValue: 1,
      gameStarted: true,
      gameOver: false,
      winner: null,
      showModal: false,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Игра в кости</h1>
        <div className="player-info">
          <h2>Игрок 1</h2>
          <p>Текущие очки: {this.state.player1Current}</p>
          <p>Общие очки: {this.state.player1Total}</p>
        </div>
        <div className="player-info">
          <h2>Игрок 2</h2>
          <p>Текущие очки: {this.state.player2Current}</p>
          <p>Общие очки: {this.state.player2Total}</p>
        </div>
        <button onClick={this.rollDice}>Бросить кубик</button>
        <button onClick={this.hold}>Оставить очки</button>
        {this.state.gameStarted ? null : (
          <button onClick={this.startNewGame}>Новая игра</button>
        )}
        <div className="dice">
          <img className='dice-image'
            src={`https://viktorsvertoka.github.io/game-of-dice/image/dice${this.state.diceValue}.png`}
            alt={`dice-${this.state.diceValue}`}
          />
        </div>
        {this.state.showModal && (
          <CongratulationsModal
            winner={`Игрок ${this.state.winner}`}
            onNewGame={this.startNewGame}
          />
        )}
      </div>
    );
  }
}

export default App;