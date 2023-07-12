import { ChessTeam, ChessTypes, MoveList } from "./ChessConst";
import {
  BoardContent,
  CheckingValidProps,
  ChessRulesProps,
  ValidPieceProps,
} from "./Interface";

export default class ChessRules {
  //PAWM
  pawnMove({
    previousPosition,
    currentPosition,
    side,
    board,
  }: ValidPieceProps) {
    const blocked = this.isBlocking({ currentPosition, board, side });
    const validEnemy = this.isValidEnemy({ currentPosition, board, side });
    const starterY = side === ChessTeam.WHITE ? 6 : 1;
    const firstMovePawn = starterY === previousPosition.y;

    const limitMovePawn =
      side === ChessTeam.WHITE
        ? currentPosition.y - previousPosition.y === -1
        : currentPosition.y - previousPosition.y === 1;
    const specialMovePawn =
      side === ChessTeam.WHITE
        ? currentPosition.y - previousPosition.y === -2
        : currentPosition.y - previousPosition.y === 2;
    const isAttackingPawn =
      limitMovePawn && Math.abs(previousPosition.x - currentPosition.x) === 1;

    if (isAttackingPawn) {
      if (validEnemy) return MoveList.ATTACK;
      if (this.isEnPassant({ currentPosition, board, side }))
        return MoveList.ATTACK_ENPASSANT;
    } else {
      if (previousPosition.x !== currentPosition.x) return MoveList.INVALID;
      if (blocked) return MoveList.INVALID;
      if (specialMovePawn && firstMovePawn) return MoveList.TRIGGER_ENPASSANT;
      if (limitMovePawn) return MoveList.MOVE;
    }
    return MoveList.INVALID;
  }

  //KNIGHT
  knightMove({
    previousPosition,
    currentPosition,
    side,
    board,
  }: ValidPieceProps) {
    const blocked = this.isBlocking({ currentPosition, board, side });
    const validEnemy = this.isValidEnemy({ currentPosition, board, side });
    const knightMovement = () => {
      if (
        Math.abs(previousPosition.x - currentPosition.x) === 2 &&
        Math.abs(previousPosition.y - currentPosition.y) === 1
      )
        return true;
      if (
        Math.abs(previousPosition.x - currentPosition.x) === 1 &&
        Math.abs(previousPosition.y - currentPosition.y) === 2
      )
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
  }

  //BISHOP
  bishopMove({
    previousPosition,
    currentPosition,
    side,
    board,
  }: ValidPieceProps) {
    const bishopMovement = () => {
      if (
        Math.abs(previousPosition.x - currentPosition.x) ==
        Math.abs(previousPosition.y - currentPosition.y)
      )
        return true;
      return false;
    };

    if (bishopMovement()) {
      const validEnemy = this.isValidEnemy({ currentPosition, board, side });
      const isMovingLeftBishop = previousPosition.x > currentPosition.x;
      const isMovingTopBishop = previousPosition.y > currentPosition.y;
      let indexY = previousPosition.y;

      for (
        let indexX = previousPosition.x;
        isMovingLeftBishop
          ? indexX >= currentPosition.x
          : indexX <= currentPosition.x;
        isMovingLeftBishop ? indexX-- : indexX++
      ) {
        const currBlocked = this.isBlocking({
          currentPosition: { x: indexX, y: indexY },
          board,
          side,
        });
        if (indexX === currentPosition.x) {
          if (currBlocked && validEnemy) return MoveList.ATTACK;
          if (!currBlocked) return MoveList.MOVE;
        }
        if (indexX !== previousPosition.x) {
          if (currBlocked) return MoveList.INVALID;
        }

        indexY += isMovingTopBishop ? -1 : 1;
      }
    }

    return MoveList.INVALID;
  }
  rookMove({
    previousPosition,
    currentPosition,
    side,
    board,
  }: ValidPieceProps) {
    const validEnemy = this.isValidEnemy({ currentPosition, board, side });
    const rookMovement = () => {
      if (
        previousPosition.x === currentPosition.x ||
        previousPosition.y === currentPosition.y
      )
        return true;
      return false;
    };

    if (rookMovement()) {
      const isMovingX = previousPosition.y === currentPosition.y;
      const currPos = isMovingX ? previousPosition.x : previousPosition.y;
      const finalPos = isMovingX ? currentPosition.x : currentPosition.y;
      const isIncreasing = currPos < finalPos;

      for (
        let index = currPos;
        isIncreasing ? index <= finalPos : index >= finalPos;
        isIncreasing ? index++ : index--
      ) {
        console.log(index, finalPos, isIncreasing);

        const currBlocked = this.isBlocking({
          currentPosition: {
            x: isMovingX ? index : currentPosition.x,
            y: isMovingX ? currentPosition.y : index,
          },
          board,
          side,
        });

        if (index === finalPos) {
          if (currBlocked && validEnemy) return MoveList.ATTACK;
          if (!currBlocked) return MoveList.MOVE;
        }

        if (index !== currPos) {
          console.log(currBlocked);
          if (currBlocked) return MoveList.INVALID;
        }
      }
    }
    return MoveList.INVALID;
  }

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
        moveResult = this.pawnMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.KNIGHT:
        moveResult = this.knightMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.BISHOP:
        moveResult = this.bishopMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;

      case ChessTypes.ROOK:
        moveResult = this.rookMove({
          previousPosition,
          currentPosition,
          side,
          board,
        });
        break;
    }
    return moveResult;
  }

  isBlocking({ currentPosition, board, side }: ChessRulesProps) {
    const piece =
      board[this.checkArrayNumber(currentPosition.x, currentPosition.y)].piece;
    if (piece) return true;
    return false;
  }

  isValidEnemy({ currentPosition, board, side }: ChessRulesProps) {
    const piece =
      board[this.checkArrayNumber(currentPosition.x, currentPosition.y)].piece;
    if (!piece) return false;
    if (piece.side === side) return false;
    return true;
  }

  isEnPassant({ currentPosition, board, side }: ChessRulesProps) {
    const enemyIndexY =
      side === ChessTeam.WHITE ? currentPosition.y + 1 : currentPosition.y - 1;
    if (
      board[this.checkArrayNumber(currentPosition.x, enemyIndexY)].piece
        ?.side !== side &&
      board[this.checkArrayNumber(currentPosition.x, enemyIndexY)].piece
        ?.enPassant
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
