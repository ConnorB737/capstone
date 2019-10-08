import Board from "../components/board/board";
import { connect } from "react-redux";
import {getBoard, placeTile, placeWord, swapTile, passRound} from "../actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
    placeWord: (socket, word, direction, startingPosition, temp_rack) => dispatch(placeWord(socket, word, direction, startingPosition, temp_rack)),
    placeTile: (placedTile) => dispatch(placeTile(placedTile)),
    getBoard: (socket) => dispatch(getBoard(socket)),
    swapTile: (socket, tile) => dispatch(swapTile(socket, tile)),
    passRound: (socket) => dispatch(passRound(socket)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);

