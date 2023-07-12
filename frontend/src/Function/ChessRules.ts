import { ChessTeam, ChessTypes, MoveList } from "./ChessConst";
import { BoardContent, CheckingValidProps } from "./Interface";

export default class ChessRules {
  isBlocking(currX: number, currY: number, board: Array<BoardContent>) {
    const piece = board[this.checkArrayNumber(currX, currY)].piece;
    if (piece) return true;
    return false;
  }

  isValidMove({
    prevX,
    prevY,
    currX,
    currY,
    type,
    side,
    board,
  }: CheckingValidProps) {
    const blocked = this.isBlocking(currX, currY, board);
    const validEnemy = this.isValidEnemy(currX, currY, board, side);
    switch (type) {
      case ChessTypes.PAWN:
        const starterY = side === ChessTeam.WHITE ? 6 : 1;
        const firstMovePawn = starterY === prevY;

        const limitMovePawn =
          side === ChessTeam.WHITE ? currY - prevY === -1 : currY - prevY === 1;
        const specialMovePawn =
          side === ChessTeam.WHITE ? currY - prevY === -2 : currY - prevY === 2;
        const isAttackingPawn = limitMovePawn && Math.abs(prevX - currX) === 1;

        if (isAttackingPawn) {
          if (validEnemy) return MoveList.ATTACK;
          if (this.isEnPassant(currX, currY, board, side))
            return MoveList.ATTACK_ENPASSANT;
        } else {
          if (prevX !== currX) return MoveList.INVALID;
          if (blocked) return MoveList.INVALID;
          if (specialMovePawn && firstMovePawn)
            return MoveList.TRIGGER_ENPASSANT;
          if (limitMovePawn) return MoveList.MOVE;
        }
        return MoveList.INVALID;

      case ChessTypes.KNIGHT:
        const knightMovement = () => {
          if (Math.abs(prevX - currX) === 2 && Math.abs(prevY - currY) === 1)
            return true;
          if (Math.abs(prevX - currX) === 1 && Math.abs(prevY - currY) === 2)
            return true;
          return false;
        };

        if (knightMovement()) {
          if (blocked) {
            if (validEnemy) return MoveList.ATTACK;
            return MoveList.INVALID;
          }
          return MoveList.MOVE;
        }
        return MoveList.INVALID;

      case ChessTypes.BISHOP:
        const bishopMovement = () => {
          if (Math.abs(prevX - currX) == Math.abs(prevY - currY)) return true;
          return false;
        };

        if (bishopMovement()) {
          const isMovingLeftBishop = prevX > currX;
          const isMovingTopBishop = prevY > currY;
          let indexY = prevY;

          for (
            let indexX = prevX;
            isMovingLeftBishop ? indexX >= currX : indexX <= currX;
            isMovingLeftBishop ? indexX-- : indexX++
          ) {
            const currBlocked = this.isBlocking(indexX, indexY, board);
            if (indexX === currX) {
              if (currBlocked && validEnemy) return MoveList.ATTACK;
              if (!currBlocked) return MoveList.MOVE;
            }
            if (indexX !== prevX) {
              if (currBlocked) return MoveList.INVALID;
            }

            indexY += isMovingTopBishop ? -1 : 1;
          }
        }

        return MoveList.INVALID;

      case ChessTypes.ROOK:
        const rookMovement = () => {
          if (prevX === currX || prevY === currY) return true;
          return false;
        };
        console.log(rookMovement());
        return MoveList.INVALID;
      default:
        return MoveList.INVALID;
    }
  }

  isValidEnemy(
    currX: number,
    currY: number,
    board: Array<BoardContent>,
    side: ChessTeam
  ) {
    const piece = board[this.checkArrayNumber(currX, currY)].piece;
    if (!piece) return false;
    if (piece.side === side) return false;
    return true;
  }

  isEnPassant(
    currX: number,
    currY: number,
    board: Array<BoardContent>,
    side: ChessTeam
  ) {
    const enemyIndexY = side === ChessTeam.WHITE ? currY + 1 : currY - 1;
    if (
      board[this.checkArrayNumber(currX, enemyIndexY)].piece?.side !== side &&
      board[this.checkArrayNumber(currX, enemyIndexY)].piece?.enPassant
    )
      return true;
    return false;
  }

  teamSelect() {
    const randomNum = Math.random();
    const result = randomNum < 0.5 ? "WHITE" : "BLACK";
    return result;
  }

  checkArrayNumber(x: number, y: number) {
    return x + y * 8;
  }
}
