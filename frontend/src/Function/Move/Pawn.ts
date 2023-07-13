import { ChessTeam, MoveList } from "../ChessConst";
import { ValidPieceProps } from "../Interface";
import { isBlocking, isEnPassant, isValidEnemy } from "../Rules/Function";

export function pawnMove({
  previousPosition,
  currentPosition,
  side,
  board,
}: ValidPieceProps) {
  const blocked = isBlocking({ currentPosition, board, side });
  const validEnemy = isValidEnemy({ currentPosition, board, side });
  const starterY = side === ChessTeam.WHITE ? 6 : 1;
  const promotionY = side === ChessTeam.WHITE ? 0 : 7;
  const promotionAvailable = promotionY === currentPosition.y;
  const firstMovePawn = starterY === previousPosition.y;
  const deltaX = previousPosition.x - currentPosition.x;
  const deltaY = previousPosition.y - currentPosition.y;

  const limitMovePawn = side === ChessTeam.WHITE ? deltaY === 1 : deltaY === -1;
  const specialMovePawn =
    side === ChessTeam.WHITE ? deltaY === 2 : deltaY === -2;
  const isAttackingPawn = limitMovePawn && Math.abs(deltaX) === 1;

  if (isAttackingPawn) {
    if (validEnemy && promotionAvailable) return MoveList.PROMOTION;
    if (validEnemy) return MoveList.ATTACK;
    if (isEnPassant({ currentPosition, board, side }))
      return MoveList.ATTACK_ENPASSANT;
  } else {
    if (deltaX !== 0) return MoveList.INVALID;
    if (blocked) return MoveList.INVALID;
    if (specialMovePawn && firstMovePawn) return MoveList.TRIGGER_ENPASSANT;
    if (validEnemy && promotionAvailable) return MoveList.PROMOTION;
    if (limitMovePawn) return MoveList.MOVE;
  }
  return MoveList.INVALID;
}
