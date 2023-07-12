import { BoardActionTypes } from "./ChessConst";
import { BoardReducerState } from "./Interface";
import { pieceSetup } from "./PieceSetup";

let boardData = [];

const checkArrayNumber = (x: number, y: number) => {
  return x + y * 8;
};

export const INITIAL_BOARD_STATE = {
  loading: true,
  board: [],
};

export type ReducerAction = {
  type: BoardActionTypes;
  payload?: any;
};

export const BoardReducers = (
  state: BoardReducerState,
  action: ReducerAction
) => {
  switch (action.type) {
    case BoardActionTypes.SETUP_BOARD:
      const { vertAxis, horiAxis } = action.payload;
      boardData = [];
      for (let rows = 0; rows < horiAxis.length; rows++) {
        for (let cols = 0; cols < vertAxis.length; cols++) {
          const pieceData = pieceSetup(rows, cols);
          boardData.push({
            tile: horiAxis[rows] + vertAxis[vertAxis.length - (cols + 1)],
            isWhiteTile: (rows + cols + 2) % 2 === 0,
            position: { x: cols, y: rows },
            piece: pieceData
              ? {
                  image: pieceData.image,
                  type: pieceData.type,
                  side: pieceData.side,
                }
              : undefined,
          });
        }
      }

      return {
        board: boardData,
        loading: false,
      };

    case BoardActionTypes.ADD_PIECE:
      const { x: addX, y: addY, piece: addPiece } = action.payload;
      boardData = [...state.board];
      boardData[checkArrayNumber(addX, addY)].piece = addPiece;

      return { ...state, board: boardData };

    case BoardActionTypes.REMOVE_PIECE:
      const { x: removeX, y: removeY } = action.payload;
      boardData = [...state.board];
      boardData[checkArrayNumber(removeX, removeY)].piece = undefined;

      return { ...state, board: boardData };

    case BoardActionTypes.ADD_ENPASSANT:
      const { x: updatedX, y: updatedY } = action.payload;
      boardData = [...state.board];
      const piece = boardData[checkArrayNumber(updatedX, updatedY)].piece;
      if (piece) {
        piece.enPassant = true;
      }

      return { ...state, board: boardData };

    case BoardActionTypes.CLEAR_ENPASSANT:
      boardData = [...state.board];
      const updatedData = boardData.map((data, ...rest) => {
        if (data.piece?.enPassant) {
          data.piece.enPassant = undefined;
        }
        return data;
      });

      return { ...state, board: updatedData };

    default:
      return state;
  }
};
