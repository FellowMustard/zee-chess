import { ChessTeam, MoveList } from "../ChessConst";
import {
  BoardContent,
  GridPosition,
  PieceProps,
  ValidPieceProps,
} from "../Interface";
import { isBlocking, isEnPassant, isValidEnemy } from "../Rules/Function";

export function pawnMove({
  previousPosition,
  currentPosition,
  side,
  board,
}: ValidPieceProps) {
  const blockedFirst = isBlocking({ currentPosition, board, side });
  const blockedSecond = isBlocking({
    currentPosition: {
      x: currentPosition.x,
      y: currentPosition.y + (side === ChessTeam.WHITE ? 1 : -1),
    },
    board,
    side,
  });
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
    if (blockedFirst) return MoveList.INVALID;
    if (specialMovePawn && firstMovePawn && !blockedSecond)
      return MoveList.TRIGGER_ENPASSANT;
    if (limitMovePawn && promotionAvailable) return MoveList.PROMOTION;
    if (limitMovePawn) return MoveList.MOVE;
  }
  return MoveList.INVALID;
}

export function pawnPreview(
  currentPosition: GridPosition,
  piece: PieceProps,
  board: Array<BoardContent>
) {
  const possibleMove = [];
  const side = piece.side;
  const starterY = side === ChessTeam.WHITE ? 6 : 1;
  const isWhite = side === ChessTeam.WHITE;
  const moveIndex = isWhite ? -1 : 1;
  const maxRight = currentPosition.x === 7;
  const maxLeft = currentPosition.x === 0;

  const blockedAhead = isBlocking({
    currentPosition: {
      x: currentPosition.x,
      y: currentPosition.y + moveIndex,
    },
    board,
    side,
  });

  const attackLeft =
    (!maxLeft &&
      isValidEnemy({
        currentPosition: {
          x: currentPosition.x - 1,
          y: currentPosition.y + moveIndex,
        },
        board,
        side,
      })) ||
    isEnPassant({
      currentPosition: {
        x: currentPosition.x - 1,
        y: currentPosition.y + moveIndex,
      },
      board,
      side,
    });

  const attackRight =
    (!maxRight &&
      isValidEnemy({
        currentPosition: {
          x: currentPosition.x + 1,
          y: currentPosition.y + moveIndex,
        },
        board,
        side,
      })) ||
    isEnPassant({
      currentPosition: {
        x: currentPosition.x + 1,
        y: currentPosition.y + moveIndex,
      },
      board,
      side,
    });

  if (attackLeft) {
    possibleMove.push({
      x: currentPosition.x - 1,
      y: currentPosition.y + moveIndex,
    });
  }

  if (attackRight) {
    possibleMove.push({
      x: currentPosition.x + 1,
      y: currentPosition.y + moveIndex,
    });
  }

  if (
    currentPosition.y === starterY &&
    !isBlocking({
      currentPosition: {
        x: currentPosition.x,
        y: currentPosition.y + moveIndex * 2,
      },
      board,
      side,
    }) &&
    !blockedAhead
  ) {
    possibleMove.push({
      x: currentPosition.x,
      y: currentPosition.y + moveIndex * 2,
    });
  }

  if (!blockedAhead) {
    possibleMove.push({
      x: currentPosition.x,
      y: currentPosition.y + moveIndex,
    });
  }

  return possibleMove;
}
