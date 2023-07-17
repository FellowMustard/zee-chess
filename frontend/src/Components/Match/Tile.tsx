import ChessImages from "../../Function/ChessImages";
import { TileProps } from "../../Function/Interface";

const Tile = ({
  titleId,
  isWhiteTile,
  grabPiece,
  movePiece,
  placePiece,
  position,
  preview,
  piece,
}: TileProps) => {
  return (
    <div
      id={titleId}
      className={`chess-tile ${isWhiteTile ? "white" : "black"} `}
      onMouseDown={(event) => grabPiece({ event, position, piece })}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(event) => placePiece({ event, position, piece })}
    >
      {piece && (
        <div
          className="chess-piece"
          style={{ backgroundImage: `url(${ChessImages[piece.image]})` }}
        />
      )}
      {preview && <div className={`preview ${piece ? "kill" : ""} `} />}
    </div>
  );
};

export default Tile;
