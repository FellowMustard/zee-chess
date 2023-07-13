import { useReducer, useEffect } from "react";
import Chessboard from "../Components/Match/Chessboard";
import { boardReducers, INITIAL_BOARD_STATE } from "../Function/BoardReducer";
import {
  BoardActionTypes,
  ChessTeam,
  PromotionActionTypes,
  horiAxis,
  vertAxis,
} from "../Function/ChessConst";
import { PieceProps } from "../Function/Interface";
import {
  INITIAL_PROMOTION_STATE,
  promotionReducers,
} from "../Function/PromotionReducer";
import ModalPromotion from "../Components/Modal/ModalPromotion";

const Match = () => {
  const [boardData, dispatchBoard] = useReducer(
    boardReducers,
    INITIAL_BOARD_STATE
  );
  const [promotionData, dispatchPromotion] = useReducer(
    promotionReducers,
    INITIAL_PROMOTION_STATE
  );

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

  const promotionReducerDispatch = (
    type: PromotionActionTypes,
    x?: number | undefined,
    y?: number | undefined,
    side?: ChessTeam | undefined
  ) => {
    dispatchPromotion({ type, payload: { x, y, side } });
  };

  const pawnPromoted = ({ type, image, side }: PieceProps) => {
    boardReducerDispatch(
      BoardActionTypes.PROMOTION,
      promotionData.positionGrid?.x,
      promotionData.positionGrid?.y,
      { type, image, side }
    );
    promotionReducerDispatch(PromotionActionTypes.CLEAR_PROMOTION);
  };

  return !boardData.loading ? (
    <div className="play-screen">
      <ModalPromotion
        show={promotionData.show}
        promotionClick={pawnPromoted}
        data={promotionData.data}
        side={promotionData.side}
      />
      <Chessboard
        board={boardData.board}
        boardReducerDispatch={boardReducerDispatch}
        promotionReducerDispatch={promotionReducerDispatch}
      />
    </div>
  ) : null;
};

export default Match;
