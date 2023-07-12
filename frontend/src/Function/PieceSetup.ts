import { ChessTeam, ChessTypes } from "./ChessConst";
export const pieceSetup = (row: number, col: number) => {
  //PAWN
  if (row === 1)
    return {
      image: "PAWN_B" as const,
      type: ChessTypes.PAWN,
      side: ChessTeam.BLACK,
    };
  if (row === 6)
    return {
      image: "PAWN_W" as const,
      type: ChessTypes.PAWN,
      side: ChessTeam.WHITE,
    };

  //ROOK
  if ((row === 0 && col === 0) || (row === 0 && col === 7))
    return {
      image: "ROOK_B" as const,
      type: ChessTypes.ROOK,
      side: ChessTeam.BLACK,
    };
  if ((row === 7 && col === 0) || (row === 7 && col === 7))
    return {
      image: "ROOK_W" as const,
      type: ChessTypes.ROOK,
      side: ChessTeam.WHITE,
    };

  //KNIGHT
  if ((row === 0 && col === 1) || (row === 0 && col === 6))
    return {
      image: "KNIGHT_B" as const,
      type: ChessTypes.KNIGHT,
      side: ChessTeam.BLACK,
    };
  if ((row === 7 && col === 1) || (row === 7 && col === 6))
    return {
      image: "KNIGHT_W" as const,
      type: ChessTypes.KNIGHT,
      side: ChessTeam.WHITE,
    };

  //BISHOP
  if ((row === 0 && col === 2) || (row === 0 && col === 5))
    return {
      image: "BISHOP_B" as const,
      type: ChessTypes.BISHOP,
      side: ChessTeam.BLACK,
    };
  if ((row === 7 && col === 2) || (row === 7 && col === 5))
    return {
      image: "BISHOP_W" as const,
      type: ChessTypes.BISHOP,
      side: ChessTeam.WHITE,
    };

  //QUEEN
  if (row === 0 && col === 3)
    return {
      image: "QUEEN_B" as const,
      type: ChessTypes.QUEEN,
      side: ChessTeam.BLACK,
    };
  if (row === 7 && col === 3)
    return {
      image: "QUEEN_W" as const,
      type: ChessTypes.QUEEN,
      side: ChessTeam.WHITE,
    };

  //KING
  if (row === 0 && col === 4)
    return {
      image: "KING_B" as const,
      type: ChessTypes.KING,
      side: ChessTeam.BLACK,
    };
  if (row === 7 && col === 4)
    return {
      image: "KING_W" as const,
      type: ChessTypes.KING,
      side: ChessTeam.WHITE,
    };

  return undefined;
};
