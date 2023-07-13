import { useReducer, useEffect } from "react";
import Chessboard from "../Components/Match/Chessboard";
import { BoardReducers, INITIAL_BOARD_STATE } from "../Function/BoardReducer";
import { BoardActionTypes, horiAxis, vertAxis } from "../Function/ChessConst";
import { PieceProps } from "../Function/Interface";
import Modal from "../Components/Modal/Modal";

const Match = () => {
  const [BoardData, dispatchBoard] = useReducer(
    BoardReducers,
    INITIAL_BOARD_STATE
  );
  // const [promotionData, dispatchPromotion] = useReducer();

  useEffect(() => {
    dispatchBoard({
      type: BoardActionTypes.SETUP_BOARD,
      payload: {
        vertAxis: vertAxis,
        horiAxis: horiAxis,
      },
    });
  }, []);

  const boardReducerDispatch = (
    type: BoardActionTypes,
    x?: number | undefined,
    y?: number | undefined,
    piece?: PieceProps | undefined
  ) => {
    dispatchBoard({ type, payload: { x, y, piece } });
  };

  return (
    <div className="play-screen">
      {/* <Modal show={} transparent={true} /> */}
      <Chessboard
        board={BoardData.board}
        loading={BoardData.loading}
        boardReducerDispatch={boardReducerDispatch}
      />
    </div>
  );
};

export default Match;
