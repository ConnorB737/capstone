import Board from "./board";
import { connect } from "react-redux";
import {placeTile, placeWord} from "./actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
    placeWord: (socket, word, direction, startingPosition) => dispatch(placeWord(socket, word, direction, startingPosition)),
    placeTile: (placedTile) => dispatch(placeTile(placedTile)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);

