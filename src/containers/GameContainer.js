import { Game } from "../components/Game";
import { connect } from "react-redux";
import {getGames, getBoard, getScores, getRack} from "../actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
  getBoard: (socket) => dispatch(getBoard(socket)),
  getScores: (socket) => dispatch(getScores(socket)),
  getRack: (socket) => dispatch(getRack(socket)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);

