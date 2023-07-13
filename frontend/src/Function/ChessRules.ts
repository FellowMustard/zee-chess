import { ChessTypes, MoveList } from "./ChessConst";
import { CheckingValidProps } from "./Interface";
import {
  bishopMove,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
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
}
