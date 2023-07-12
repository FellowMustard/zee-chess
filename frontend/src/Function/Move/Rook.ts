import { MoveList } from "../ChessConst";
import { ValidPieceProps } from "../Interface";
import { isBlocking, isValidEnemy } from "../Rules/Function";

export function rookMove({
  previousPosition,
  currentPosition,
  side,
  board,
}: ValidPieceProps) {
  const validEnemy = isValidEnemy({ currentPosition, board, side });
  const isMovingX = previousPosition.y === currentPosition.y;

  const rookMovement = () => {
    if (
      previousPosition.x === currentPosition.x ||
      previousPosition.y === currentPosition.y
    )
      return true;
    return false;
  };

  if (rookMovement()) {
    const currPos = isMovingX ? previousPosition.x : previousPosition.y;
    const finalPos = isMovingX ? currentPosition.x : currentPosition.y;
    const isIncreasing = currPos < finalPos;

    for (
      let index = currPos;
      isIncreasing ? index <= finalPos : index >= finalPos;
      isIncreasing ? index++ : index--
    ) {
      const currBlocked = isBlocking({
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

      if (index !== currPos && currBlocked) return MoveList.INVALID;
    }
  }
  return MoveList.INVALID;
}
