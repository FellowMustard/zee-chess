import { useEffect, useRef, useState } from "react";
import ChessRules from "../../Function/ChessRules";
import {
  BoardActionTypes,
  ChessTeam,
  MoveList,
  PromotionActionTypes,
} from "../../Function/ChessConst";
import Tile from "./Tile";
import {
  ChessBoardProps,
  InteractPieceProps,
  GridPosition,
} from "../../Function/Interface";

const Chessboard = ({
  board,
  boardReducerDispatch,
  promotionReducerDispatch,
}: ChessBoardProps) => {
  const [currPiece, setCurrPiece] = useState<HTMLElement>();
  const [movePreview, setMovePreview] = useState<Array<GridPosition>>();
  const chessBoardRef = useRef<HTMLDivElement>(null);
  const rules = new ChessRules();

  useEffect(() => {
    if (!movePreview || movePreview.length === 0) {
      boardReducerDispatch(BoardActionTypes.CLEAR_PREVIEW);
    } else {
      movePreview.forEach((preview) => {
        boardReducerDispatch(
          BoardActionTypes.ADDING_PREVIEW,
          preview.x,
          preview.y
        );
      });
    }
  }, [movePreview]);

  //When Grabbing Piece
  const grabPiece = ({ event, position, piece }: InteractPieceProps) => {
    const element = event.target as HTMLElement;
    const chessBoard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessBoard && piece) {
      const minX = chessBoard.offsetLeft;
      const minY = chessBoard.offsetTop;

      const maxX = minX + chessBoard.clientWidth - 75;
      const maxY = minY + chessBoard.clientHeight - 75;

      const x = event.clientX - 35;
      const y = event.clientY - 35;

      element.style.position = "absolute";
      element.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
      element.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;

      setCurrPiece((prevState) => (prevState = element));
      setMovePreview((prevState) => {
        const previewArr = rules.previewMoves(
          { x: position.x, y: position.y },
          piece,
          board
        );
        return previewArr;
      });
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
      currPiece.style.zIndex = "50";
      currPiece.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
      currPiece.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;
    }
  };

  //When Placing Pieces
  const placePiece = ({ event, position, piece }: InteractPieceProps) => {
    const chessBoard = chessBoardRef.current;
    setMovePreview((prevState) => (prevState = []));
    if (currPiece && chessBoard && piece) {
      const currX = Math.floor((event.clientX - chessBoard.offsetLeft) / 75);
      const currY = Math.floor((event.clientY - chessBoard.offsetTop) / 75);

      if (currX - position.x === 0 && currY - position.y === 0) {
        currPiece.style.zIndex = "0";
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
        currPiece.style.zIndex = "0";
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
        promotionReducerDispatch(
          PromotionActionTypes.TRIGGER_PROMOTION,
          currX,
          currY,
          piece.side
        );
      }

      currPiece.style.position = "static";
      currPiece.style.zIndex = "0";
      setCurrPiece((prevState) => (prevState = undefined));
    }
  };

  return (
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
            preview={tile.preview}
            piece={tile.piece}
          />
        );
      })}
    </div>
  );
};

export default Chessboard;
