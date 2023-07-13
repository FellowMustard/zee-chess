import { useRef, useState } from "react";
import ChessRules from "../../Function/ChessRules";
import {
  BoardActionTypes,
  ChessTeam,
  MoveList,
} from "../../Function/ChessConst";
import Tile from "./Tile";
import { ChessBoardProps, PlacePieceProps } from "../../Function/Interface";

const Chessboard = ({
  board,
  loading,
  boardReducerDispatch,
}: ChessBoardProps) => {
  const [currPiece, setCurrPiece] = useState<HTMLElement>();
  const chessBoardRef = useRef<HTMLDivElement>(null);
  const rules = new ChessRules();

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
  const placePiece = ({ event, position, piece }: PlacePieceProps) => {
    const chessBoard = chessBoardRef.current;
    if (currPiece && chessBoard && piece) {
      const currX = Math.floor((event.clientX - chessBoard.offsetLeft) / 75);
      const currY = Math.floor((event.clientY - chessBoard.offsetTop) / 75);

      if (currX - position.x === 0 && currY - position.y === 0) {
        currPiece.style.position = "static";
        setCurrPiece((prevState) => (prevState = undefined));
        return;
      }

      const checkMove = rules.isValidMove({
        previousPosition: { x: position.x, y: position.y },
        currentPosition: { x: currX, y: currY },
        type: piece.type,
        side: piece.side,
        board: board,
      });

      if (checkMove === MoveList.INVALID) {
        currPiece.style.position = "static";
        setCurrPiece((prevState) => (prevState = undefined));
        return;
      }

      if (checkMove === MoveList.ATTACK_ENPASSANT) {
        const enemyIndexY =
          piece.side === ChessTeam.WHITE ? currY + 1 : currY - 1;
        boardReducerDispatch(BoardActionTypes.REMOVE_PIECE, currX, enemyIndexY);
      }

      boardReducerDispatch(BoardActionTypes.CLEAR_ENPASSANT);

      if (checkMove === MoveList.TRIGGER_ENPASSANT) {
        boardReducerDispatch(BoardActionTypes.ADD_ENPASSANT, currX, currY);
      }

      boardReducerDispatch(BoardActionTypes.ADD_PIECE, currX, currY, piece);
      boardReducerDispatch(
        BoardActionTypes.REMOVE_PIECE,
        position.x,
        position.y
      );

      if (checkMove === MoveList.PROMOTION) {
        console.log("promotion");
      }

      currPiece.style.position = "static";
      setCurrPiece((prevState) => (prevState = undefined));
    }
  };

  return !loading ? (
    <div className="chess-board" ref={chessBoardRef}>
      {board.map((tile) => {
        return (
          <Tile
            key={tile.tile}
            titleId={tile.tile}
            isWhiteTile={tile.isWhiteTile}
            grabPiece={grabPiece}
            movePiece={movePiece}
            placePiece={placePiece}
            position={tile.position}
            piece={tile.piece}
          />
        );
      })}
    </div>
  ) : null;
};

export default Chessboard;
