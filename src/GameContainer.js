import { Game } from "./Game";
import { connect } from "react-redux";
import { getGames, getBoard, getScores } from "./actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
  getBoard: (socket) => dispatch(getBoard(socket)),
  getScores: (socket) => dispatch(getScores(socket)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);

