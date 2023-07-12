import ChessImages from "../../Function/ChessImages";
import { TileProps } from "../../Function/Interface";

const Tile = ({
  titleId,
  isWhiteTile,
  grabPiece,
  movePiece,
  placePiece,
  position,
  piece,
}: TileProps) => {
  return (
    <div
      id={titleId}
      className={`chess-tile ${isWhiteTile ? "white" : "black"}`}
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(event) => placePiece({ event, position, piece })}
    >
      {piece && (
        <div
          className="chess-piece"
          style={{ backgroundImage: `url(${ChessImages[piece.image]})` }}
        />
      )}
    </div>
  );
};

export default Tile;
