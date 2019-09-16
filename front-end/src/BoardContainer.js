import Board from "./board";
import { connect } from "react-redux";
import { placeWord } from "./actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  placeWord: (socket, word, direction, startingPosition) => dispatch(placeWord(socket, word, direction, startingPosition)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);

