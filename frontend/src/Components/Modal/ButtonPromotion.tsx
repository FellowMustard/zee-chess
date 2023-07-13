import { ChessTeam, ChessTypes } from "../../Function/ChessConst";
import { useEffect, useState } from "react";
import { PieceButtonProps, PieceProps } from "../../Function/Interface";
import ChessImages from "../../Function/ChessImages";

interface ButtonPromotionProps {
  onClick: ({ type, image, side }: PieceProps) => void;
  data: string;
  side: ChessTeam;
}

const ButtonPromotion = ({ onClick, data, side }: ButtonPromotionProps) => {
  const [buttonData, setButtonData] = useState<PieceButtonProps>();

  useEffect(() => {
    const checkData = (data: string, side: ChessTeam) => {
      let objectData;
      switch (data) {
        case "BISHOP":
          objectData = {
            image:
              side === ChessTeam.WHITE
                ? ChessImages.BISHOP_W
                : ChessImages.BISHOP_B,
            imageString:
              side === ChessTeam.WHITE
                ? ("BISHOP_W" as const)
                : ("BISHOP_B" as const),
            type: ChessTypes.BISHOP,
            side,
          };
          break;
        case "KNIGHT":
          objectData = {
            image:
              side === ChessTeam.WHITE
                ? ChessImages.KNIGHT_W
                : ChessImages.KNIGHT_B,
            imageString:
              side === ChessTeam.WHITE
                ? ("KNIGHT_W" as const)
                : ("KNIGHT_B" as const),
            type: ChessTypes.KNIGHT,
            side,
          };
          break;
        case "QUEEN":
          objectData = {
            image:
              side === ChessTeam.WHITE
                ? ChessImages.QUEEN_W
                : ChessImages.QUEEN_B,
            imageString:
              side === ChessTeam.WHITE
                ? ("QUEEN_W" as const)
                : ("QUEEN_B" as const),
            type: ChessTypes.QUEEN,
            side,
          };
          break;
        case "ROOK":
          objectData = {
            image:
              side === ChessTeam.WHITE
                ? ChessImages.ROOK_W
                : ChessImages.ROOK_B,
            imageString:
              side === ChessTeam.WHITE
                ? ("ROOK_W" as const)
                : ("ROOK_B" as const),
            type: ChessTypes.ROOK,
            side,
          };
          break;
      }
      return objectData;
    };
    setButtonData((prevState) => {
      return checkData(data, side);
    });
  }, []);

  return buttonData ? (
    <button
      className="promotion-button"
      onClick={() =>
        onClick({
          image: buttonData.imageString,
          type: buttonData.type,
          side: buttonData.side,
        })
      }
      style={{ backgroundImage: `url(${buttonData?.image})` }}
    ></button>
  ) : null;
};

export default ButtonPromotion;
