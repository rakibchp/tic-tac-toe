'use client';

import { useState } from 'react';

type Player = 'X' | 'O' | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Vertical
  [0, 4, 8],
  [2, 4, 6], // Diagonal
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  function calculateWinner(squares: Player[]): Player {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  let status: string;
  if (winner) {
    status = `Winner: ${winner} 🎉`;
  } else if (isDraw) {
    status = `It's a Draw! 🤝`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-800 p-6 shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold text-center mb-4 tracking-wide">
          Tic Tac Toe
        </h1>

        <div className="text-center text-lg font-semibold mb-6 text-indigo-400">
          {status}
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`h-24 rounded-xl text-3xl font-extrabold flex items-center justify-center transition-all duration-150 ${
                cell === 'X'
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-500/40'
                  : cell === 'O'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-700/50 hover:bg-slate-700 text-transparent border border-slate-600'
              }`}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors shadow-md"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
