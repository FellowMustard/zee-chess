import { MoveList } from "../ChessConst";
import {
  BoardContent,
  GridPosition,
  PieceProps,
  ValidPieceProps,
} from "../Interface";
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

export function rookPreview(
  currentPosition: GridPosition,
  piece: PieceProps,
  board: Array<BoardContent>
) {
  const possibleMove = [];
  const side = piece.side;
  const moveOffsets = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  for (const offset of moveOffsets) {
    let newX = currentPosition.x + offset.x;
    let newY = currentPosition.y + offset.y;

    while (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const targetPosition = { x: newX, y: newY };
      const isBlocked = isBlocking({
        currentPosition: targetPosition,
        board,
        side,
      });
      const validEnemy = isValidEnemy({
        currentPosition: targetPosition,
        board,
        side,
      });

      if (isBlocked) {
        if (validEnemy) {
          possibleMove.push(targetPosition);
        }
        break;
      }

      possibleMove.push(targetPosition);

      if (validEnemy) {
        break;
      }

      newX += offset.x;
      newY += offset.y;
    }
  }

  return possibleMove;
}
