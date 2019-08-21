import { Game } from "./Game";
import { connect } from "react-redux";
import { getGames } from "./actions";
import { getBoard } from "./actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
});

const mapBoardToProps = dispatch => ({
  getBoard: (socket) => dispatch(getBoard(socket)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mapBoardToProps,
)(Game);

