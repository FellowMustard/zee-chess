import { ChessTeam } from "../ChessConst";
import { ChessRulesProps } from "../Interface";

export function isBlocking({ currentPosition, board, side }: ChessRulesProps) {
  const piece =
    board[checkArrayNumber(currentPosition.x, currentPosition.y)].piece;
  if (piece) return true;
  return false;
}

export function isValidEnemy({
  currentPosition,
  board,
  side,
}: ChessRulesProps) {
  const piece =
    board[checkArrayNumber(currentPosition.x, currentPosition.y)].piece;
  if (!piece) return false;
  if (piece.side === side) return false;
  return true;
}

export function isEnPassant({ currentPosition, board, side }: ChessRulesProps) {
  const enemyIndexY =
    side === ChessTeam.WHITE ? currentPosition.y + 1 : currentPosition.y - 1;
  if (
    board[checkArrayNumber(currentPosition.x, enemyIndexY)].piece?.side !==
      side &&
    board[checkArrayNumber(currentPosition.x, enemyIndexY)].piece?.enPassant
  )
    return true;
  return false;
}

function checkArrayNumber(x: number, y: number) {
  return x + y * 8;
}
