import {
  BoardActionTypes,
  ChessTeam,
  ChessTypes,
  PromotionActionTypes,
} from "./ChessConst";
import ChessImages from "./ChessImages";

export interface BoardReducerState {
  loading: boolean;
  board: Array<BoardContent>;
  side: ChessTeam;
}
export interface PromotionReducerState {
  show: boolean;
  positionGrid?: GridPosition | undefined;
  data: Array<string>;
  side?: ChessTeam | undefined;
}
export interface BoardContent {
  tile: string;
  isWhiteTile: boolean;
  position: GridPosition;
  preview: boolean;
  piece?: PieceProps | undefined;
}
export interface PieceProps {
  image: keyof typeof ChessImages;
  type: ChessTypes;
  side: ChessTeam;
  enPassant?: boolean | undefined;
}

export interface PieceButtonProps extends PieceProps {
  imageString: keyof typeof ChessImages;
}

export interface InteractPieceProps {
  event: React.MouseEvent;
  position: GridPosition;
  piece?: PieceProps | undefined;
}

export interface ChessBoardProps {
  board: Array<BoardContent>;
  boardReducerDispatch: (
    type: BoardActionTypes,
    x?: number | undefined,
    y?: number | undefined,
    piece?: PieceProps | undefined
  ) => void;
  promotionReducerDispatch: (
    type: PromotionActionTypes,
    x?: number | undefined,
    y?: number | undefined,
    side?: ChessTeam | undefined
  ) => void;
}

export interface ReducerAction {
  type: BoardActionTypes | PromotionActionTypes;
  payload?: any;
}

export interface TileProps {
  titleId: string;
  isWhiteTile: boolean;
  grabPiece: (event: InteractPieceProps) => void;
  movePiece: (event: React.MouseEvent) => void;
  placePiece: (event: InteractPieceProps) => void;
  position: GridPosition;
  preview: boolean;
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
  background: string;
  children: React.ReactNode | undefined;
}
