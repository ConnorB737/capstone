import { Dashboard } from "../components/Dashboard";
import { connect } from "react-redux";
import {getGames, logout, redirectTo, joinGame} from "../actions";


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getGames: (socket) => dispatch(getGames(socket)),
  redirectToLogin: () => dispatch(redirectTo("/login")),
  logout: () => dispatch(logout()),
  joinGame: (socket, gameId) => dispatch(joinGame(socket, gameId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);

