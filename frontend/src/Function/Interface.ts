import { ChessTeam, ChessTypes } from "./ChessConst";
import ChessImages from "./ChessImages";

export interface BoardReducerState {
  loading: boolean;
  board: Array<BoardContent>;
}
export interface BoardContent {
  tile: string;
  isWhiteTile: boolean;
  gridX: number;
  gridY: number;
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
  gridX: number;
  gridY: number;
  piece?: PieceProps | undefined;
}
export interface TileProps {
  titleId: string;
  isWhiteTile: boolean;
  grabPiece: (event: React.MouseEvent) => void;
  movePiece: (event: React.MouseEvent) => void;
  placePiece: (event: PlacePieceProps) => void;
  gridX: number;
  gridY: number;
  piece?: PieceProps | undefined;
}
export interface CheckingValidProps {
  prevX: number;
  prevY: number;
  currX: number;
  currY: number;
  type: ChessTypes;
  side: ChessTeam;
  board: Array<BoardContent>;
}
