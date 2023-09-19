import React from 'react';

function CongratulationsModal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Поздравляем!</h2>
        <p>Игрок {props.winner} победил!</p>
        <button onClick={props.onNewGame}>Новая игра</button>
      </div>
    </div>
  );
}

export default CongratulationsModal;