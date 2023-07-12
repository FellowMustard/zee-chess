import { ChessTeam, ChessTypes } from "./ChessConst";
import ChessImages from "./ChessImages";

export interface BoardReducerState {
  loading: boolean;
  board: Array<BoardContent>;
}
export interface BoardContent {
  tile: string;
  isWhiteTile: boolean;
  position: gridPosition;
  piece?: PieceProps | undefined;
}
export interface PieceProps {
  image: keyof typeof ChessImages;
  type: ChessTypes;
  side: ChessTeam;
  enPassant?: boolean | undefined;
}
export interface PlacePieceProps {
  event: React.MouseEvent;
  position: gridPosition;
  piece?: PieceProps | undefined;
}
export interface TileProps {
  titleId: string;
  isWhiteTile: boolean;
  grabPiece: (event: React.MouseEvent) => void;
  movePiece: (event: React.MouseEvent) => void;
  placePiece: (event: PlacePieceProps) => void;
  position: gridPosition;
  piece?: PieceProps | undefined;
}
export interface CheckingValidProps {
  previousPosition: gridPosition;
  currentPosition: gridPosition;
  type: ChessTypes;
  side: ChessTeam;
  board: Array<BoardContent>;
}
export interface ChessRulesProps {
  currentPosition: gridPosition;
  side: ChessTeam;
  board: Array<BoardContent>;
}
export interface ValidPieceProps extends Omit<CheckingValidProps, "type"> {}

export interface gridPosition {
  x: number;
  y: number;
}
