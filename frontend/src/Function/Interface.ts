import { BoardActionTypes, ChessTeam, ChessTypes } from "./ChessConst";
import ChessImages from "./ChessImages";

export interface BoardReducerState {
  loading: boolean;
  board: Array<BoardContent>;
}
export interface BoardContent {
  tile: string;
  isWhiteTile: boolean;
  position: GridPosition;
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
  position: GridPosition;
  piece?: PieceProps | undefined;
}
export interface ChessBoardProps {
  board: Array<BoardContent>;
  loading: boolean;
  boardReducerDispatch: (
    type: BoardActionTypes,
    x?: number | undefined,
    y?: number | undefined,
    piece?: PieceProps | undefined
  ) => void;
}
export interface TileProps {
  titleId: string;
  isWhiteTile: boolean;
  grabPiece: (event: React.MouseEvent) => void;
  movePiece: (event: React.MouseEvent) => void;
  placePiece: (event: PlacePieceProps) => void;
  position: GridPosition;
  piece?: PieceProps | undefined;
}
export interface CheckingValidProps {
  previousPosition: GridPosition;
  currentPosition: GridPosition;
  type: ChessTypes;
  side: ChessTeam;
  board: Array<BoardContent>;
}
export interface ChessRulesProps {
  currentPosition: GridPosition;
  side: ChessTeam;
  board: Array<BoardContent>;
}
export interface ValidPieceProps extends Omit<CheckingValidProps, "type"> {}

export interface GridPosition {
  x: number;
  y: number;
}

export interface ModalProps {
  show: boolean;
  transparent: boolean;
}
