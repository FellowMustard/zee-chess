import { MoveList } from "../ChessConst";
import { ValidPieceProps } from "../Interface";
import { isBlocking, isValidEnemy } from "../Rules/Function";

export function kingMove({
  previousPosition,
  currentPosition,
  side,
  board,
}: ValidPieceProps) {
  const deltaX_abs = previousPosition.x - currentPosition.x;
  const deltaY_abs = previousPosition.y - currentPosition.y;
  const blocked = isBlocking({ currentPosition, board, side });
  const validEnemy = isValidEnemy({ currentPosition, board, side });

  const kingMovement = () => {
    if (deltaX_abs <= 1 || deltaY_abs <= 1) return true;
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
