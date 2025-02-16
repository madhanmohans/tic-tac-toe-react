import { useState } from 'react';

function Square( { value , onSquareClick } ) {
  return (
    <button 
      className = "square"
      onClick = { onSquareClick }
      >
      { value }
    </button>
  ); 
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xisNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  if(winner) status = "The Winner is " + winner;
  else status = "The Next Turn is for " + (xisNext? "X" : "O");

  function handleClick(i) {
    if(squares[i] || winner) return; // returns early if the square has X/O (not null) already
    const nextSquareState = squares.slice();
    if(xisNext) {
      nextSquareState[i] = "X";
    }
    else {
      nextSquareState[i] = "O";
    }
    setSquares(nextSquareState);
    setXIsNext(!xisNext);
  }
  return(
    <>
      <div className="status">{ status }</div>
      <div className="board-row">
        <Square value = { squares[0] } onSquareClick = { () => handleClick(0) } />
        <Square value = { squares[1] } onSquareClick = { () => handleClick(1) } />
        <Square value = { squares[2] } onSquareClick = { () => handleClick(2) } />
      </div>
      <div className="board-row">
      <Square value = { squares[3] } onSquareClick = { () => handleClick(3) } />
      <Square value = { squares[4] } onSquareClick = { () => handleClick(4) } />
      <Square value = { squares[5] } onSquareClick = { () => handleClick(5) } />
      </div>
      <div className="board-row">
      <Square value = { squares[6] } onSquareClick = { () => handleClick(6) } />
      <Square value = { squares[7] } onSquareClick = { () => handleClick(7) } />
      <Square value = { squares[8] } onSquareClick = { () => handleClick(8) } />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCombination.length; i++) {
    const [ firstSquare, secondSquare, thirdSquare] = winningCombination[i];
    if( squares[firstSquare] && squares[firstSquare] === squares[secondSquare] && squares[firstSquare] === squares[thirdSquare]) {
      return squares[firstSquare];
    }
  }
  return null;
}