import { MoveList } from "../ChessConst";
import {
  BoardContent,
  GridPosition,
  PieceProps,
  ValidPieceProps,
} from "../Interface";
import { isBlocking, isValidEnemy } from "../Rules/Function";

export function kingMove({
  previousPosition,
  currentPosition,
  side,
  board,
}: ValidPieceProps) {
  const deltaX_abs = Math.abs(previousPosition.x - currentPosition.x);
  const deltaY_abs = Math.abs(previousPosition.y - currentPosition.y);
  const blocked = isBlocking({ currentPosition, board, side });
  const validEnemy = isValidEnemy({ currentPosition, board, side });

  const kingMovement = () => {
    if (deltaX_abs <= 1 && deltaY_abs <= 1) return true;
    return false;
  };

  if (kingMovement()) {
    if (blocked) {
      if (validEnemy) return MoveList.ATTACK;
      return MoveList.INVALID;
    }
    return MoveList.MOVE;
  }
  return MoveList.INVALID;
}

export function kingPreview(
  currentPosition: GridPosition,
  piece: PieceProps,
  board: Array<BoardContent>
) {
  const possibleMove = [];
  const moveOffsets = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];

  for (const offset of moveOffsets) {
    const newX = currentPosition.x + offset.x;
    const newY = currentPosition.y + offset.y;

    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const targetPosition = { x: newX, y: newY };
      const isBlocked = isBlocking({
        currentPosition: targetPosition,
        board,
        side: piece.side,
      });
      const validEnemy = isValidEnemy({
        currentPosition: targetPosition,
        board,
        side: piece.side,
      });

      if (!isBlocked || validEnemy) {
        possibleMove.push(targetPosition);
      }
    }
  }

  return possibleMove;
}
