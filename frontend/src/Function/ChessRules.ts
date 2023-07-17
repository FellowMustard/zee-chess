import { ChessTypes, MoveList } from "./ChessConst";
import {
  BoardContent,
  CheckingValidProps,
  GridPosition,
  PieceProps,
} from "./Interface";
import {
  bishopMove,
  bishopPreview,
  kingMove,
  kingPreview,
  knightMove,
  knightPreview,
  pawnMove,
  pawnPreview,
  queenMove,
  queenPreview,
  rookMove,
  rookPreview,
} from "./Move/Index";

export default class ChessRules {
  isValidMove({
    previousPosition,
    currentPosition,
    type,
    side,
    board,
  }: CheckingValidProps) {
    let moveResult;
    switch (type) {
      case ChessTypes.PAWN:
        moveResult = pawnMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.KNIGHT:
        moveResult = knightMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.BISHOP:
        moveResult = bishopMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.ROOK:
        moveResult = rookMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.QUEEN:
        moveResult = queenMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.KING:
        moveResult = kingMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      default:
        moveResult = MoveList.INVALID;
        break;
    }
    return moveResult;
  }

  checkArrayNumber(x: number, y: number) {
    return x + y * 8;
  }

  previewMoves(
    position: GridPosition,
    piece: PieceProps,
    board: Array<BoardContent>
  ): GridPosition[] {
    switch (piece.type) {
      case ChessTypes.PAWN:
        return pawnPreview(position, piece, board);
      case ChessTypes.KNIGHT:
        return knightPreview(position, piece, board);
      case ChessTypes.BISHOP:
        return bishopPreview(position, piece, board);
      case ChessTypes.ROOK:
        return rookPreview(position, piece, board);
      case ChessTypes.QUEEN:
        return queenPreview(position, piece, board);
      case ChessTypes.KING:
        return kingPreview(position, piece, board);
    }
  }
}
