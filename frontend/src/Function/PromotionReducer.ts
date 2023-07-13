import { ChessTeam, PromotionActionTypes } from "./ChessConst";
import { PromotionReducerState, ReducerAction } from "./Interface";

export const INITIAL_PROMOTION_STATE = {
  show: false,
  data: ["BISHOP", "KNIGHT", "QUEEN", "ROOK"],
};

export const promotionReducers = (
  state: PromotionReducerState,
  action: ReducerAction
) => {
  switch (action.type) {
    case PromotionActionTypes.TRIGGER_PROMOTION:
      const { x: triggerX, y: triggerY, side } = action.payload;
      return {
        data: ["BISHOP", "KNIGHT", "QUEEN", "ROOK"],
        show: true,
        positionGrid: { x: triggerX, y: triggerY },
        side: side,
      };
    case PromotionActionTypes.CLEAR_PROMOTION:
      return {
        data: ["BISHOP", "KNIGHT", "QUEEN", "ROOK"],
        show: false,
        positionGrid: undefined,
        side: undefined,
      };
    default:
      return state;
  }
};
