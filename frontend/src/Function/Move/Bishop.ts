import { ChessTeam, MoveList } from "../ChessConst";
import {
  BoardContent,
  GridPosition,
  PieceProps,
  ValidPieceProps,
} from "../Interface";
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

export function bishopPreview(
  currentPosition: GridPosition,
  piece: PieceProps,
  board: Array<BoardContent>
) {
  const possibleMove = [];
  const side = piece.side;
  const moveOffsets = [
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
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
