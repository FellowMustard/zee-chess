import { MoveList } from "../ChessConst";
import { ValidPieceProps } from "../Interface";
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
