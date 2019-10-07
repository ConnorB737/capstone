import { Game } from "../components/Game";
import { connect } from "react-redux";
import {getGames, getBoard, getScores, getRack, getTilesLeft, getHistory, getRoundStatus, getPlayersLeft} from "../actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
  getBoard: (socket) => dispatch(getBoard(socket)),
  getScores: (socket) => dispatch(getScores(socket)),
  getRack: (socket) => dispatch(getRack(socket)),
  getTilesLeft: (socket) => dispatch(getTilesLeft(socket)),
  getHistory: (socket) => dispatch(getHistory(socket)),
  getRoundStatus: (socket) => dispatch(getRoundStatus(socket)),
  getPlayersLeft: (socket) => dispatch(getPlayersLeft(socket)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);

