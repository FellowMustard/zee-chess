import { ChessTeam } from "../../Function/ChessConst";
import ButtonPromotion from "./ButtonPromotion";
import Modal from "./Modal";
import { PieceProps } from "../../Function/Interface";

interface ModalPromotionProps {
  show: boolean;
  promotionClick: ({ type, image, side }: PieceProps) => void;
  data: Array<string>;
  side: ChessTeam;
}

const ModalPromotion = ({
  show,
  promotionClick,
  data,
  side,
}: ModalPromotionProps) => {
  return (
    <Modal show={show} transparent={true} background="rgba(0, 0, 0, 0.8)">
      <div className="chess-button-container">
        {data.map((pieceData) => {
          return (
            <ButtonPromotion
              key={pieceData}
              onClick={promotionClick}
              data={pieceData}
              side={side}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default ModalPromotion;
