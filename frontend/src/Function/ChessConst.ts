export enum ChessTypes {
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
}
export enum ChessTeam {
  BLACK,
  WHITE,
}

export enum BoardActionTypes {
  SETUP_BOARD = "SETUP_BOARD",
  ADD_PIECE = "ADD_PIECE",
  REMOVE_PIECE = "REMOVE_PIECE",
  ADD_ENPASSANT = "ADD_ENPASSANT",
  CLEAR_ENPASSANT = "CLEAR_ENPASSANT",
  PROMOTION = "PROMOTION",
}

export enum PromotionActionTypes {
  TRIGGER_PROMOTION = "TRIGGER_PROMOTION",
  CLEAR_PROMOTION = "CLEAR_PROMOTION",
}

export enum MoveList {
  MOVE = "MOVE",
  ATTACK = "ATTACK",
  TRIGGER_ENPASSANT = "TRIGGER_ENPASSANT",
  ATTACK_ENPASSANT = "ATTACK_ENPASSANT",
  PROMOTION = "PROMOTION",
  INVALID = "INVALID",
}

export const vertAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const horiAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
