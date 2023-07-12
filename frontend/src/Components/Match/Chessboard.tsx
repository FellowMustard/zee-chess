import { useRef, useReducer, useEffect, useState } from "react";
import {
  BoardReducers,
  INITIAL_BOARD_STATE,
} from "../../Function/BoardReducer";
import ChessRules from "../../Function/ChessRules";
import {
  BoardActionTypes,
  ChessTeam,
  MoveList,
  horiAxis,
  vertAxis,
} from "../../Function/ChessConst";
import Tile from "./Tile";
import { PlacePieceProps } from "../../Function/Interface";

const Chessboard = () => {
  const [BoardData, dispatch] = useReducer(BoardReducers, INITIAL_BOARD_STATE);
  const [currPiece, setCurrPiece] = useState<HTMLElement>();
  const chessBoardRef = useRef<HTMLDivElement>(null);
  const rules = new ChessRules();

  useEffect(() => {
    dispatch({
      type: BoardActionTypes.SETUP_BOARD,
      payload: {
        vertAxis: vertAxis,
        horiAxis: horiAxis,
      },
    });
  }, []);

  //When Grabbing Piece
  const grabPiece = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    const chessBoard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessBoard) {
      const minX = chessBoard.offsetLeft;
      const minY = chessBoard.offsetTop;

      const maxX = minX + chessBoard.clientWidth - 75;
      const maxY = minY + chessBoard.clientHeight - 75;

      const x = e.clientX - 35;
      const y = e.clientY - 35;

      element.style.position = "absolute";
      element.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
      element.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;

      setCurrPiece((prevState) => (prevState = element));
    }
  };

  // When Moving While Grabbing
  const movePiece = (e: React.MouseEvent) => {
    const chessBoard = chessBoardRef.current;
    if (currPiece && chessBoard) {
      const minX = chessBoard.offsetLeft;
      const minY = chessBoard.offsetTop;

      const maxX = minX + chessBoard.clientWidth - 75;
      const maxY = minY + chessBoard.clientHeight - 75;

      const x = e.clientX - 35;
      const y = e.clientY - 35;

      currPiece.style.position = "absolute";
      currPiece.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
      currPiece.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;
    }
  };

  //When Placing Pieces
  const placePiece = ({ event, gridX, gridY, piece }: PlacePieceProps) => {
    const chessBoard = chessBoardRef.current;
    if (currPiece && chessBoard && piece) {
      const currX = Math.floor((event.clientX - chessBoard.offsetLeft) / 75);
      const currY = Math.floor((event.clientY - chessBoard.offsetTop) / 75);

      if (currX - gridX === 0 && currY - gridY === 0) {
        currPiece.style.position = "static";
        setCurrPiece((prevState) => (prevState = undefined));
        return;
      }

      const checkMove = rules.isValidMove({
        prevX: gridX,
        prevY: gridY,
        currX,
        currY,
        type: piece.type,
        side: piece.side,
        board: BoardData.board,
      });

      if (checkMove === MoveList.INVALID) {
        currPiece.style.position = "static";
        setCurrPiece((prevState) => (prevState = undefined));
        return;
      }

      if (checkMove === MoveList.ATTACK_ENPASSANT) {
        const enemyIndexY =
          piece.side === ChessTeam.WHITE ? currY + 1 : currY - 1;
        dispatch({
          type: BoardActionTypes.REMOVE_PIECE,
          payload: {
            x: currX,
            y: enemyIndexY,
          },
        });
      }

      dispatch({
        type: BoardActionTypes.CLEAR_ENPASSANT,
      });

      if (checkMove === MoveList.TRIGGER_ENPASSANT) {
        dispatch({
          type: BoardActionTypes.ADD_ENPASSANT,
          payload: {
            x: currX,
            y: currY,
            piece: piece,
          },
        });
      }

      dispatch({
        type: BoardActionTypes.ADD_PIECE,
        payload: {
          x: currX,
          y: currY,
          piece: piece,
        },
      });

      dispatch({
        type: BoardActionTypes.REMOVE_PIECE,
        payload: {
          x: gridX,
          y: gridY,
        },
      });

      currPiece.style.position = "static";
      setCurrPiece((prevState) => (prevState = undefined));
    }
  };

  return !BoardData.loading ? (
    <div className="chess-board" ref={chessBoardRef}>
      {BoardData.board.map((tile) => {
        return (
          <Tile
            key={tile.tile}
            titleId={tile.tile}
            isWhiteTile={tile.isWhiteTile}
            grabPiece={grabPiece}
            movePiece={movePiece}
            placePiece={placePiece}
            gridX={tile.gridX}
            gridY={tile.gridY}
            piece={tile.piece}
          />
        );
      })}
    </div>
  ) : null;
};

export default Chessboard;
