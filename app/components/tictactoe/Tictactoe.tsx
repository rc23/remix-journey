import { useEffect, useState } from "react";
import type { LoaderData } from "app/routes/tictactoe";

interface Players {
  [index: string]: string;
}

const PLAYERS: Players = {
  p1: "X",
  p2: "O",
};

const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Tictactoe(data: LoaderData) {
  let [board, setBoard] = useState(data.board);
  let [isPlayerOneTurn, setisPlayerOneTurn] = useState(data.isPlayerOneTurn);
  let [isThereAWinner, setIsThereAWinner] = useState(false);

  useEffect(() => {
    WINNING_CONDITIONS.forEach((condition) => {
      if (
        board[condition[0]] === "X" &&
        board[condition[1]] === "X" &&
        board[condition[2]] === "X"
      ) {
        setIsThereAWinner(true);
        alertResultAndClearBoard("Winner - Player 1");
      }

      if (
        board[condition[0]] === "O" &&
        board[condition[1]] === "O" &&
        board[condition[2]] === "O"
      ) {
        setIsThereAWinner(true);
        alertResultAndClearBoard("Winner - Player 2");
      }
    });
  }, [board]);

  useEffect(() => {
    let areAllButtonsDisabled = 0;

    const buttons = document.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].hasAttribute("disabled")) {
        areAllButtonsDisabled++;
      }
    }

    if (areAllButtonsDisabled === board.length && !isThereAWinner) {
      alertResultAndClearBoard("Tie");
    }
  }, [board]);

  const alertResultAndClearBoard = (message: string) => {
    alert(message);
    resetBoard();
  };

  const markSquare = (isPlayerOneTurn: boolean, i: number) => {
    let button = document.getElementById(`button-${i}`);
    let marker = isPlayerOneTurn ? PLAYERS["p1"] : PLAYERS["p2"];

    button!.innerHTML = marker;
    button!.setAttribute("disabled", "");

    let newBoard = [...board];

    newBoard[i] = marker;

    setBoard(newBoard);
    setisPlayerOneTurn(!isPlayerOneTurn);
  };

  const renderBoard = (board: string[], isPlayerOneTurn: boolean) =>
    board.map((square: string, i: number) => (
      <button
        key={i}
        id={`button-${i}`}
        onClick={() => markSquare(isPlayerOneTurn, i)}
      >
        {square}
      </button>
    ));

  const resetBoard = () => {
    let buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute("disabled");
    }
    setBoard(data.board);
    setIsThereAWinner(false);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>

      <h5>{isPlayerOneTurn ? "Player 1" : "Player 2"}</h5>

      <div className="board">{renderBoard(board, isPlayerOneTurn)}</div>

      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}
