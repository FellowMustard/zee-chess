import { MoveList } from "../ChessConst";
import { ValidPieceProps } from "../Interface";
import { isBlocking, isValidEnemy } from "../Rules/Function";

export function bishopMove({
  previousPosition,
  currentPosition,
  side,
  board,
}: ValidPieceProps) {
  const deltaX_Abs = Math.abs(previousPosition.x - currentPosition.x);
  const deltaY_Abs = Math.abs(previousPosition.y - currentPosition.y);

  const bishopMovement = () => {
    if (deltaX_Abs === deltaY_Abs) return true;
    return false;
  };

  if (bishopMovement()) {
    const validEnemy = isValidEnemy({ currentPosition, board, side });
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
      const currBlocked = isBlocking({
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
