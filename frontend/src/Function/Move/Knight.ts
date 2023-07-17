import { ChessTeam, MoveList } from "../ChessConst";
import {
  BoardContent,
  GridPosition,
  PieceProps,
  ValidPieceProps,
} from "../Interface";
import { isBlocking, isValidEnemy } from "../Rules/Function";

export function knightMove({
  previousPosition,
  currentPosition,
  side,
  board,
}: ValidPieceProps) {
  const blocked = isBlocking({ currentPosition, board, side });
  const validEnemy = isValidEnemy({ currentPosition, board, side });
  const deltaX_Abs = Math.abs(previousPosition.x - currentPosition.x);
  const deltaY_Abs = Math.abs(previousPosition.y - currentPosition.y);
  const knightMovement = () => {
    if (deltaX_Abs === 2 && deltaY_Abs === 1) return true;
    if (deltaX_Abs === 1 && deltaY_Abs === 2) return true;
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

export function knightPreview(
  currentPosition: GridPosition,
  piece: PieceProps,
  board: Array<BoardContent>
) {
  const possibleMove = [];
  const side = piece.side;
  const moveOffsets = [
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: -2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: 2, y: -1 },
    { x: 2, y: 1 },
  ];

  for (const offset of moveOffsets) {
    const newX = currentPosition.x + offset.x;
    const newY = currentPosition.y + offset.y;

    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
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

      if (!isBlocked || validEnemy) {
        possibleMove.push(targetPosition);
      }
    }
  }

  return possibleMove;
}
